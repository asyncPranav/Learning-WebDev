import { body } from "express-validator";

const forgotPasswordValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email"),
];

const resetPasswordValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be exactly 6 characters")
    .matches(/^\d{6}$/)
    .withMessage("OTP must be exactly 6 digits"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password is not strong enough"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Passwords do not match"),
];

export { forgotPasswordValidator, resetPasswordValidator };
