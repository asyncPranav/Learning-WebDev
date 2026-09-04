import { body } from "express-validator";

const verifyEmailValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("otp")
    .trim()
    .matches(/^\d{6}$/)
    .withMessage("OTP must be exactly 6 digits"),
];

const resendVerificationOtpValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),
];

export {
  verifyEmailValidator,
  resendVerificationOtpValidator,
};