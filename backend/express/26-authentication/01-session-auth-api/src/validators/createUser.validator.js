// Misconception: express-validator is a library for form input validation.
// Truth: express-validator library doesn't care whether the request came from a browser form or an API client.

import { body } from "express-validator";

const createUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
];

export default createUserValidator;