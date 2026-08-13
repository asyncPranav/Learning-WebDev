import express from "express";

// Middlewares
import validateObjectId from "../middlewares/validateObjectId.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import authenticate from "../middlewares/auth.middleware.js";

// Validators
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
  .get(authenticate, validate, getAllTasks)
  .post(authenticate, createTaskValidator, validate, createTask);

router
  .route("/:id")
  .get(authenticate, validateObjectId, getTask)
  .patch(authenticate, validateObjectId, updateTaskValidator, validate, updateTask)
  .delete(authenticate, validateObjectId, deleteTask);

export default router;