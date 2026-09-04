import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";

import {
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
} from "../controllers/auth.controller.js";

import {
  verifyEmailValidator,
  resendVerificationOtpValidator,
} from "../validators/auth.validator.js";

import {
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/passwordReset.validator.js";

import validate from "../middlewares/validate.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/getme", authenticate, getMe);
authRouter.get("/refresh-token", refreshTokens); // Client can request this route to get a new access token using the refresh token stored in the cookie
authRouter.post("/logout", authenticate, logout); // authenticate is used to ensure that the user is logged in before they can log out
authRouter.post("/logout-all", authenticate, logoutAll); // authenticate is used to ensure that the user is logged in before they can log out from all devices
authRouter.get("/sessions", authenticate, getSessions); // get all sessions for the logged-in user - return all devices where the user is logged in
authRouter.post("/verify-email", verifyEmailValidator, validate, verifyEmail); // verify email using OTP
authRouter.post("/resend-otp", resendVerificationOtpValidator, validate, resendVerificationOtp); // resend email verification OTP
authRouter.post("/forget-password", forgotPasswordValidator, validate, forgetPassword); // send password reset email
authRouter.post("/reset-password", resetPasswordValidator, validate, resetPassword); // reset password using OTP

export default authRouter;
