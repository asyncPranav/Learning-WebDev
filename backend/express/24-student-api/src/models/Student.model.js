import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
