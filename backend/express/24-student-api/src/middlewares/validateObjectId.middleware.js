import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID",
    });
  }
  next();
};

export default validateObjectId;