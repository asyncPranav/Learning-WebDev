import express from "express";
const router = express.Router();

import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/student.controller.js";

import createStudentValidator from "../middlewares/createStudentValidator.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import validateObjectId from "../middlewares/validateObjectId.middleware.js";
import updateStudentValidator from "../middlewares/updateStudentValidator.middleware.js";

router
  .route("/")
  .get(getAllStudents)
  .post(upload.single("profile"), createStudentValidator, createStudent); // The "profile" name must match the field name sent by the client

router
  .route("/:id")
  .get(validateObjectId, getStudentById)
  .patch(validateObjectId, updateStudentValidator, upload.single("profile"), updateStudentById)
  .delete(validateObjectId, deleteStudentById);

export default router;
