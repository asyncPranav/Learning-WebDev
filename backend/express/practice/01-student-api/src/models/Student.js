import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: false,
  }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;