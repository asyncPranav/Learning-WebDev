import express from "express";

import validateObjectId from "../middlewares/validateObjectId.middleware.js";
import createUserValidator from "../validators/createUser.validator.js";
import createUserValidate from "../middlewares/createUserValidate.middleware.js";
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
  .post(createUserValidator, createUserValidate, createUser);

router
  .route("/:id")
  .get(validateObjectId, getUser)
  .patch(validateObjectId, updateUserValidator, updateUser)
  .delete(validateObjectId, deleteUser);

export default router;
