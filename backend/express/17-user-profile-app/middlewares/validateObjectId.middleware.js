import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render("400", {
      message: "Invalid profile ID",
    });
  }

  next();
};

export default validateObjectId;