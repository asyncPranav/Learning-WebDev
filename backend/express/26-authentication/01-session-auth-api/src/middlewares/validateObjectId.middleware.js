import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return next(new ApiError(400, `Invalid ObjectId: ${id}`));
  }
  next();
};

export default validateObjectId;
