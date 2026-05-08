/* 
import express from "express";
import {
  getAllProfiles,
  getProfileById,
  createProfilePage,
  createProfile,
  editProfilePage,
  editProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Home page
router.get("/", getAllProfiles);

// Create profile page
router.get("/create", createProfilePage);

// Create profile
router.post("/create", createProfile);

// Read profile
router.get("/profile/:id", getProfileById);

// Edit profile page
router.get("/edit/:id", editProfilePage);

// Edit profile
router.post("/edit/:id", editProfile);

// Delete profile
router.post("/delete/:id", deleteProfile);

export default router;


*/

// Updated version with file upload and ObjectId validation
import express from "express";

import {
  getAllProfiles,
  getProfileById,
  createProfilePage,
  createProfile,
  editProfilePage,
  editProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";

import upload from "../middlewares/upload.middleware.js";
import validateObjectId from "../middlewares/validateObjectId.middleware.js";

const router = express.Router();

// Home page
router.get("/", getAllProfiles);

// Create profile page
router.get("/create", createProfilePage);

// Create profile
router.post("/create", upload.single("image"), createProfile);

// Read single profile with ObjectId validation
router.get("/profile/:id", validateObjectId, getProfileById);

// Edit profile page with ObjectId validation
router.get("/edit/:id", validateObjectId, editProfilePage);

// Edit profile with ObjectId validation and file upload
router.post("/edit/:id", validateObjectId, upload.single("image"), editProfile);

// Delete profile with ObjectId validation
router.post("/delete/:id", validateObjectId, deleteProfile);

export default router;