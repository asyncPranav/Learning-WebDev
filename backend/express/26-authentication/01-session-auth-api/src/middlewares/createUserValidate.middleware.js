import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const createUserValidate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return next(new ApiError(400, "Validation failed", errorMessages));
  }

  next();
};

export default createUserValidate;
