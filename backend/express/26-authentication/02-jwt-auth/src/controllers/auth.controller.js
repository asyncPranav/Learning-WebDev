import bcrypt from "bcrypt";
import mongoose from "mongoose";

import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";

import ApiError from "../utils/ApiError.js";
import * as token from "../utils/token.util.js";
import * as cookie from "../utils/cookie.util.js";

import otpModel from "../models/otp.model.js";
import generateOTP from "../utils/otp.util.js";
import sendEmail from "../services/email.service.js";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 1. It will find user using username or email, if user is already registered then return error message
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    // 400 - Bad Request
    // 409 - Conflict
    if (isAlreadyRegistered) {
      throw new ApiError(409, "User already registered");
    }

    // 2. Hash the password using bcrypt module
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // 4. Generate OTP for email verification
    const otp = generateOTP();

    // 5. Hash the OTP before storing it in the database for security reasons
    const hashedOTP = await bcrypt.hash(otp, 10);

    // 6. Remove any previous OTPs for this email and purpose (email_verification) to avoid multiple OTPs being valid at the same time
    await otpModel.deleteMany({
      email,
      purpose: "email_verification",
    });

    // 7. Store the new OTP in the database
    await otpModel.create({
      email,
      otpHash: hashedOTP,
      purpose: "email_verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP expires in 10 minutes
    });

    // 8. Send the OTP to the user's email address
    await sendEmail(
      email,
      "Verify your email",
      `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      `
        <h2>Verify your email</h2>
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    );

    // 9. Registration successful, return response to the client
    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isEmailVerified: newUser.isEmailVerified,
      },
    });

    /* ==>>> generate access token and refresh token after email verification, we will do it in /verify-email route

    // Generate random session ID for the user session
    const sessionId = new mongoose.Types.ObjectId();

    // Generate refresh token
    const refreshToken = token.generateRefreshToken(newUser._id, sessionId);

    // create hash of refresh token to store in database for security reasons
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Create a session
    const session = await sessionModel.create({
      _id: sessionId,
      user: newUser._id,
      refreshToken: hashedRefreshToken,
      ip: req.ip,
      userAgent: req.get("User-Agent"), // or req.headers["user-agent"]
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    // Generate access token
    const accessToken = token.generateAccessToken(newUser._id, session._id);

    // Set the refresh token in an HTTP-only cookie
    cookie.setRefreshTokenCookie(res, refreshToken);

    // 201 - Created
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      accessToken,
    }); 
    */
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user by email
    // Problem: Our schema has select: false for password field, so password will not be returned by default when we query the user.
    // So we need to explicitly select the password field here.
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Problem: User can login even if their email is not verified,
    // so we need to check if the user's email is verified or not.
    if (!user.isEmailVerified) {
      throw new ApiError(401, "Please verify your email before logging in");
    }

    // if user found, compare entered password with hashed password in database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid email or password");
    }

    /* --> refer note 01-jwt-access-token-location, we are doing it in /register route
      
      // Generate JWT access token
      const accessToken = jwt.sign(
        {
          sub: user._id.toString(),
        },
        config.jwtSecret,
        {
          expiresIn: "15m", // Access token expires in 15 minutes
        },
      );

      // Generate JWT refresh token
      const refreshToken = jwt.sign(
        {
          sub: user._id.toString(),
        },
        config.refreshSecret,
        {
          expiresIn: "7d", // Refresh token expires in 7d
        },
      );

      // 200 - OK
      return res.status(200).json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    */

    // Generate random session ID for the user session
    const sessionId = new mongoose.Types.ObjectId();

    // Generate refresh token
    const refreshToken = token.generateRefreshToken(user._id, sessionId);

    // Hash refresh token to store in database for security reasons
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Create a session
    const session = await sessionModel.create({
      _id: sessionId,
      user: user._id,
      refreshToken: hashedRefreshToken,
      ip: req.ip,
      userAgent: req.get("User-Agent"), // or req.headers["user-agent"]
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    // Generate access token
    const accessToken = token.generateAccessToken(user._id, session._id);

    // Set the refresh token in an HTTP-only cookie
    cookie.setRefreshTokenCookie(res, refreshToken);

    // 200 - OK
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    // Find the user by their ID
    const user = await userModel.findById(req.user.sub);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  try {
    // Get the refresh token from the HTTP-only cookie
    // How - because we have already set the refresh token in an HTTP-only cookie in /register and /login route, so we can get it from there
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ApiError(401, "No refresh token provided");
    }

    // Verify the refresh token
    const decoded = token.verifyRefreshToken(refreshToken);

    // Find the session that belongs to this user and refresh token
    // we do not fetch this session using refresh token
    // we fetch this session using session ID (sid) and user ID (sub) from the decoded refresh token payload
    const session = await sessionModel.findOne({
      _id: decoded.sid,
      user: decoded.sub,
    });

    // If no matching session is found, reject the refresh request
    if (!session) {
      throw new ApiError(401, "Session not found");
    }

    // Check whether the session has been revoked
    if (session.revoked) {
      throw new ApiError(401, "Session has been revoked");
    }

    // Check whether the session has expired
    if (session.expiresAt < new Date()) {
      throw new ApiError(401, "Session has expired");
    }

    // verify the refresh token against the hashed version stored in the database
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      session.refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Generate a new access token
    const newAccessToken = token.generateAccessToken(decoded.sub, decoded.sid);

    // For security reasons, we may generate a new refresh token as well and set it in the cookie again.
    // This is optional and depends on your security requirements.
    const newRefreshToken = token.generateRefreshToken(
      decoded.sub,
      decoded.sid,
    );

    // Hash the new refresh token to store in the database
    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);

    // Update the session with the new hashed refresh token and extend the expiration date
    // 1. replace the old hashed refresh token with the new hashed refresh token
    // 2. extend the expiration date of the session by 15 days from now
    session.refreshToken = hashedNewRefreshToken;
    session.expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

    // Save the updated session to the database
    // Note: We are not creating a new session here, we are updating the existing session with the new refresh token and expiration date
    await session.save();

    // Set the new refresh token in an HTTP-only cookie
    cookie.setRefreshTokenCookie(res, newRefreshToken);

    // 200 - OK
    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // Our authenticate middleware already verified the access token and
    // attached the decoded payload to req.user -> req.user = decoded, where decoded = { sub: userId, sid: sessionId }
    // so we can use it here

    // Find the session by ID and user ID
    const session = await sessionModel.findOne({
      _id: req.user.sid,
      user: req.user.sub,
    });

    // If no matching session is found, reject the logout request
    if (!session) {
      throw new ApiError(401, "Session not found");
    }

    // Mark the session as revoked in the database
    // Revoked means that the session is no longer valid and cannot be used to refresh tokens or access protected resources
    session.revoked = true;

    // Save the updated session to the database
    await session.save();

    // Clear the refresh token cookie
    cookie.clearRefreshTokenCookie(res);

    // 200 - OK
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const logoutAll = async (req, res, next) => {
  try {
    // Our authenticate middleware already verified the access token and
    // attached the decoded payload to req.user => req.user = decoded, where decoded = { sub: userId, sid: sessionId }
    // so we can use it here

    // Find all sessions for the user and mark them as revoked
    await sessionModel.updateMany(
      { user: req.user.sub },
      { $set: { revoked: true } },
    );

    // Clear the refresh token cookie
    cookie.clearRefreshTokenCookie(res);

    // 200 - OK
    return res.status(200).json({
      message: "Logged out of all sessions successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSessions = async (req, res, next) => {
  try {
    // Our authenticate middleware already verified the access token and
    // attached the decoded payload to req.user => req.user = decoded, where decoded = { sub: userId, sid: sessionId }
    // so we can use it here

    // Find all sessions for the user
    const sessions = await sessionModel
      .find({
        user: req.user.sub,
        revoked: false,
      })
      .select("-refreshToken") // Exclude the refresh token from the response for security reasons
      .sort({ createdAt: -1 }); // Sort sessions by creation date in descending order

    // 200 - OK
    return res.status(200).json({
      message: "Sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // 1. Find the OTP record for the given email and purpose (email_verification)
    const otpRecord = await otpModel.findOne({
      email,
      purpose: "email_verification",
    });

    // 2. If no OTP record is found, return an error
    if (!otpRecord) {
      throw new ApiError(400, "No OTP found for this email");
    }

    // 3. Check max attempts
    if (otpRecord.attempts >= 3) {
      throw new ApiError(
        400,
        "Maximum OTP verification attempts exceeded. Please request a new OTP.",
      );
    }

    // 4. Check if the OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      throw new ApiError(400, "OTP has expired");
    }

    // 5. Compare the provided OTP with the hashed OTP in the database
    const isOTPValid = await bcrypt.compare(otp, otpRecord.otpHash);

    // 6. Increment attempts and return error on entering wrong OTP
    if (!isOTPValid) {
      // Increment the number of attempts
      otpRecord.attempts += 1;
      await otpRecord.save();
      throw new ApiError(400, "Invalid OTP");
    }

    // 7. Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // 8. If OTP is valid, mark the user's email as verified
    user.isEmailVerified = true;
    await user.save();

    // 9. Delete the OTP record after successful verification
    await otpModel.deleteOne({ _id: otpRecord._id });

    // 10. Generate a new refresh token and create a new session for the user after successful email verification
    const sessionId = new mongoose.Types.ObjectId();
    const refreshToken = token.generateRefreshToken(user._id, sessionId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const session = new sessionModel({
      _id: sessionId,
      user: user._id,
      refreshToken: hashedRefreshToken,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });
    await session.save();

    // 11. Generate a new access token for the user
    const accessToken = token.generateAccessToken(user._id, session._id);

    // 12. Set the new refresh token in an HTTP-only cookie
    cookie.setRefreshTokenCookie(res, refreshToken);

    // 13. Return success response with access token
    return res.status(200).json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const resendVerificationOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // 1. Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // 2. Check if email is already verified
    if (user.isEmailVerified) {
      throw new ApiError(400, "Email is already verified");
    }

    // 3. check if an OTP already exists for this email and purpose (email_verification)
    const existingOtp = await otpModel.findOne({
      email,
      purpose: "email_verification",
    });

    // 4. Handle the case where an existing OTP is found
    if (existingOtp) {
      const now = new Date();

      // 4a. Check if OTP has expired
      if (existingOtp.expiresAt <= now) {
        // OTP expired → delete it
        await otpModel.deleteOne({
          _id: existingOtp._id,
        });
      } else {
        // 4b. OTP is still valid → check 60-second cooldown
        const cooldown = 60 * 1000;

        const timePassed = Date.now() - existingOtp.createdAt.getTime();

        if (timePassed < cooldown) {
          const timeLeft = Math.ceil((cooldown - timePassed) / 1000);

          throw new ApiError(
            429,
            `Please wait ${timeLeft} seconds before requesting a new verification OTP.`,
          );
        }

        // 4c. Cooldown has passed → delete old OTP
        await otpModel.deleteOne({
          _id: existingOtp._id,
        });
      }
    }


    // 5. Generate new OTP
    const otp = generateOTP();

    // 6. Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // 7. Delete previous OTP - we already handled the case where an existing OTP is found above, so we can safely delete it here
    // await otpModel.deleteMany({
    //   email,
    //   purpose: "email_verification",
    // });

    // 8. Store new OTP
    await otpModel.create({
      email,
      otpHash: hashedOtp,
      purpose: "email_verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // 9. Send new OTP
    await sendEmail(
      email,
      "Verify your email",
      `Your new email verification OTP is ${otp}. It will expire in 10 minutes.`,
      `
        <h2>Verify your email</h2>
        <p>Your new email verification OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    );

    return res.status(200).json({
      message: ` New verification OTP sent successfully at ${email}. Please check your email.`,
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // 1. Find user
    const user = await userModel.findOne({ email });

    // 2. Do not reveal whether the email exists
    // why 200 - OK? Because we don't want to reveal whether the email exists or not, so we return a generic message to the client. This is a security best practice to prevent user enumeration attacks.
    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, a password reset OTP has been sent.",
      });
    }

    // 3. Check if a password reset OTP already exists
    const existingOtp = await otpModel.findOne({
      email,
      purpose: "password_reset",
    });

    // 4. Handle existing OTP
    if (existingOtp) {
      const now = new Date();

      // 4a. If OTP has expired, delete it
      if (existingOtp.expiresAt <= now) {
        await otpModel.deleteOne({
          _id: existingOtp._id,
        });
      } else {
        // 4b. OTP is still valid → check 60-second cooldown
        const cooldown = 60 * 1000;

        const timePassed =
          Date.now() - existingOtp.createdAt.getTime();

        if (timePassed < cooldown) {
          const timeLeft = Math.ceil(
            (cooldown - timePassed) / 1000,
          );

          throw new ApiError(
            429,
            `Please wait ${timeLeft} seconds before requesting a new password reset OTP.`,
          );
        }

        // 4c. Cooldown has passed → delete old OTP
        await otpModel.deleteOne({
          _id: existingOtp._id,
        });
      }
    }

    // 5. Generate new OTP
    const otp = generateOTP();

    // 6. Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // 7. Store new OTP
    await otpModel.create({
      email,
      otpHash: hashedOtp,
      purpose: "password_reset",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // 8. Send OTP email
    await sendEmail(
      email,
      "Reset your password",
      `Your password reset OTP is ${otp}. It will expire in 10 minutes.`,
      `
        <h2>Password Reset</h2>
        <p>Your password reset OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request a password reset, you can ignore this email.</p>
      `,
    );

    // 9. Success response
    return res.status(200).json({
      message:
        "If an account exists with this email, a password reset OTP has been sent.",
    });
  } catch (error) {
    next(error);
  }
};


const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Find password reset OTP
    const otpRecord = await otpModel.findOne({
      email,
      purpose: "password_reset",
    });

    if (!otpRecord) {
      throw new ApiError(
        400,
        "Invalid or expired password reset OTP",
      );
    }

    // 2. Check maximum attempts
    if (otpRecord.attempts >= 3) {
      throw new ApiError(
        400,
        "Maximum OTP verification attempts exceeded. Please request a new OTP.",
      );
    }

    // 3. Check OTP expiry
    if (otpRecord.expiresAt <= new Date()) {
      await otpModel.deleteOne({
        _id: otpRecord._id,
      });

      throw new ApiError(
        400,
        "Invalid or expired password reset OTP",
      );
    }

    // 4. Verify OTP
    const isOtpValid = await bcrypt.compare(
      otp,
      otpRecord.otpHash,
    );

    if (!isOtpValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();

      throw new ApiError(
        400,
        "Invalid or expired password reset OTP",
      );
    }

    // 5. Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new ApiError(
        400,
        "Invalid or expired password reset OTP",
      );
    }

    // 6. Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10,
    );

    // 7. Update password
    user.password = hashedPassword;
    await user.save();

    // 8. Revoke all existing sessions
    await sessionModel.updateMany(
      { user: user._id },
      { $set: { revoked: true } },
    );

    // 9. Delete used OTP
    await otpModel.deleteOne({
      _id: otpRecord._id,
    });

    // 10. Send password reset confirmation email
    await sendEmail(
      email,
      "Your password was changed",
      "Your password was changed successfully. If you did not make this change, please secure your account immediately.",
      `
        <h2>Password Changed Successfully</h2>
        <p>Your password has been changed successfully.</p>
        <p>
          If you did not make this change, please secure your account immediately.
        </p>
      `,
    );

    // 11. Success response
    return res.status(200).json({
      message:
        "Password reset successfully. Please login again with your new password.",
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  getMe,
  refreshTokens,
  logout,
  logoutAll,
  getSessions,
  verifyEmail,
  resendVerificationOtp,
  forgetPassword,
  resetPassword,
};
