import express from "express";

import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);

router.post("/", createStudent);

router.get("/:id", getStudentById);

router.patch("/:id", updateStudent);

router.delete("/:id", deleteStudent);


/* 
  Group similar routes together (common convention):

  router
    .route("/")
    .get(getAllStudents)
    .post(createStudent);

  router
    .route("/:id")
    .get(getStudentsById)
    .patch(updateStudent)
    .delete(deleteStudent);


  This is more scalable and is commonly used in production projects.

*/

export default router;