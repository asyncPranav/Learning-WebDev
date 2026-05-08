import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },
    // mongodb does not store actual image files, instead we store the image URL or path
    image: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true },
);

const profile = mongoose.model("Profile", profileSchema);

export default profile;
