import express from "express";

// import createUserValidator from "../validators/createUser.validator.js"; // because registration is handled in auth.route.js, we don't need to create a user here
import updateUserValidator from "../validators/updateUser.validator.js";
import updateRoleValidator from "../validators/updateRole.validator.js";

import validateObjectId from "../middlewares/validateObjectId.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, authorize("admin"), getAllUsers)
  // .post(createUserValidator, validate, createUser); // because registration is handled in auth.route.js, we don't need to create a user here

  // Order of this route matters. It should be placed before the route with "/:id" to avoid conflicts.
router.patch("/:id/role", authenticate, authorize("admin"), validateObjectId, updateRoleValidator, validate, updateUserRole);

router
  .route("/:id")
  .get(authenticate, authorize("admin"), validateObjectId, getUser)
  .patch(authenticate, authorize("admin"), validateObjectId, updateUserValidator, validate, updateUser)
  .delete(authenticate, authorize("admin"), validateObjectId, deleteUser);

export default router;
