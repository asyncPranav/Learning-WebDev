import express from "express";

import validateObjectId from "../middlewares/validateObjectId.middleware.js";
// import createUserValidator from "../validators/createUser.validator.js"; // because registration is handled in auth.route.js, we don't need to create a user here
import validate from "../middlewares/validate.middleware.js";
import updateUserValidator from "../validators/updateUser.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

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
  .get(authenticate, authorize("admin"), getAllUsers)
  // .post(createUserValidator, validate, createUser); // because registration is handled in auth.route.js, we don't need to create a user here

router
  .route("/:id")
  .get(authenticate, authorize("admin"), validateObjectId, getUser)
  .patch(authenticate, authorize("admin"), validateObjectId, updateUserValidator, validate, updateUser)
  .delete(authenticate, authorize("admin"), validateObjectId, deleteUser);

export default router;
