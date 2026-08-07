import express from "express";

import validateObjectId from "../middlewares/validateObjectId.middleware.js";
import createUserValidator from "../validators/createUser.validator.js";
import validate from "../middlewares/validate.middleware.js";
import updateUserValidator from "../validators/updateUser.validator.js";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidator, validate, createUser);

router
  .route("/:id")
  .get(validateObjectId, getUser)
  .patch(validateObjectId, updateUserValidator, validate, updateUser)
  .delete(validateObjectId, deleteUser);

export default router;
