import Student from "../models/Student.js";
import mongoose from "mongoose";

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!validID) {
      return res.status(400).json({ message: "Invalid student id" });
    }

    const student = await Student.findById(validID);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!validID) {
      return res.status(400).json({ message: "Invalid student id" });
    }

    // const student = await Student.findById(validID);

    // if (!student) {
    //   return res.status(404).json({ message: "Student not found" });
    // }

    const updatedStudent = await Student.findByIdAndUpdate(validID, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id)
      ? req.params.id
      : null;

    if (!validID) {
      return res.status(400).json({ message: "Invalid student id" });
    }

    const deletedStudent = await Student.findByIdAndDelete(validID);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "student deleted", data: deleteStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};

