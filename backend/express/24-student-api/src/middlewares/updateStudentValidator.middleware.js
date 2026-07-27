import { body, validationResult } from "express-validator";

const updateStudentValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty().withMessage("Name cannot be empty"),

  body("rollNo")
    .optional()
    .isInt({ min: 1 }).withMessage("Roll number must be positive"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export default updateStudentValidator;
