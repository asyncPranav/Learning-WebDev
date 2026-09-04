import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";

const generateAccessToken = (userId, sessionId) => {
  // return a string -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N...9fQ.XYZ...
  return jwt.sign(
    {
      sub: userId.toString(),
      sid: sessionId.toString(),
    },
    config.jwtSecret,
    {
      expiresIn: "15m",
    },
  );
};

const generateRefreshToken = (userId, sessionId) => {
  // return a string -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N...9fQ.XYZ...
  return jwt.sign(
    {
      sub: userId.toString(),
      sid: sessionId.toString(),
    },
    config.refreshSecret,
    {
      expiresIn: "15d",
    },
  );
};

const verifyAccessToken = (token) => {
  try {
    // it return decoded payload -> { sub: 'user_id', sid: 'session_id', iat: 1690000000, exp: 1690003600 }
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
};

const verifyRefreshToken = (token) => {
  try {
    // it return decoded payload -> { sub: 'user_id', sid: 'session_id', iat: 1690000000, exp: 1690003600 }
    return jwt.verify(token, config.refreshSecret);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
