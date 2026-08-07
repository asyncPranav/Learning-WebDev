// We have used optional() and notEmpty() validators to make sure that the user can update only the fields they want to update. If a field is not provided, it will be ignored. If a field is provided but is empty, it will throw an error.
// If field is provided then it cant be empty and if it is empty then it will throw an error.
// If field is not provided then it will be ignored.

import { body } from "express-validator";

const updateUserValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
];

export default updateUserValidator;
