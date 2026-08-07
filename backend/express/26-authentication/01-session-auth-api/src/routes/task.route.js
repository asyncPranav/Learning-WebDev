import express from "express";

import validateObjectId from "../middlewares/validateObjectId.middleware.js"
import validate from "../middlewares/validate.middleware.js"

import createTaskValidator from "../validators/createTask.validator.js";
import updateTaskValidator from "../validators/updateTask.validator.js";

import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router
  .route("/")
  .get(validate, getAllTasks)
  .post(createTaskValidator, validate, createTask);

router
  .route("/:id")
  .get(validateObjectId, getTask)
  .patch(validateObjectId, updateTaskValidator, validate, updateTask)
  .delete(validateObjectId, deleteTask);

export default router;