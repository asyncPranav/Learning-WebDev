import { body } from "express-validator";

const updateRoleValidator = [
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),
];

export default updateRoleValidator;