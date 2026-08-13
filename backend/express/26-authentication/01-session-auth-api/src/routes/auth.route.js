import express from "express";

import createUserValidator from "../validators/createUser.validator.js";
import loginValidator from "../validators/login.validator.js";

import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

import { register, login, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", createUserValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", authenticate, getMe);

export default router;
