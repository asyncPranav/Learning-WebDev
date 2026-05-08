/* 

import Profile from "../models/profile.model.js";
import mongoose from "mongoose";

// GET ALL PROFILES
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.render("home", { profiles });
  } catch (error) {
    return res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// GET SINGLE PROFILE
const getProfileById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render("400", {
      message: "Invalid profile ID",
    });
  }

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).render("404", {
        message: "Profile not found",
      });
    }

    res.render("show-profile", { profile });
  } catch (error) {
    return res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// CREATE PROFILE PAGE
const createProfilePage = (req, res) => {
  res.render("add-profile");
};

// CREATE PROFILE (WITH IMAGE SUPPORT)
const createProfile = async (req, res) => {
  try {
    // validate file first
    if (!req.file) {
      return res.status(400).render("400", {
        message: "Profile image is required",
      });
    }
    const profileData = {
      ...req.body,
      image: req.file.filename,
    };

    await Profile.create(profileData);

    res.redirect("/");
  } catch (error) {
    return res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// EDIT PROFILE PAGE
const editProfilePage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render("400", {
      message: "Invalid profile ID",
    });
  }

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).render("404", {
        message: "Profile not found",
      });
    }

    res.render("edit-profile", { profile });
  } catch (error) {
    return res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// UPDATE PROFILE
const editProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render("400", {
      message: "Invalid profile ID",
    });
  }

  try {
    const updateData = {
      ...req.body,
    };

    // If new image uploaded, update it
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Profile.findByIdAndUpdate(id, updateData, {
      runValidators: true,
      new: true,
    });

    res.redirect("/");
  } catch (error) {
    return res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// DELETE PROFILE
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render("400", {
      message: "Invalid profile ID",
    });
  }

  try {
    await Profile.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    return res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// EXPORTS
export {
  getAllProfiles,
  getProfileById,
  createProfilePage,
  createProfile,
  editProfilePage,
  editProfile,
  deleteProfile,
};


*/

// Updated version with centralized error handling and ObjectId validation middleware
import Profile from "../models/profile.model.js";

// GET ALL PROFILES
const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.render("home", { profiles });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE PROFILE
const getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).render("404", {
        message: "Profile not found",
      });
    }

    res.render("show-profile", { profile });
  } catch (err) {
    next(err);
  }
};

// CREATE PROFILE PAGE
const createProfilePage = (req, res) => {
  res.render("add-profile");
};

// CREATE PROFILE
const createProfile = async (req, res, next) => {
  try {
    // validate file first
    if (!req.file) {
      return res.status(400).render("400", {
        message: "Profile image is required",
      });
    }

    const profileData = {
      ...req.body,
      image: req.file.filename,
    };

    await Profile.create(profileData);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

// EDIT PROFILE PAGE
const editProfilePage = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).render("404", {
        message: "Profile not found",
      });
    }

    res.render("edit-profile", { profile });
  } catch (err) {
    next(err);
  }
};

// UPDATE PROFILE
const editProfile = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body,
    };

    // If new image uploaded, update it
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Profile.findByIdAndUpdate(req.params.id, updateData, {
      runValidators: true,
      new: true,
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

// DELETE PROFILE
const deleteProfile = async (req, res, next) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

export {
  getAllProfiles,
  getProfileById,
  createProfilePage,
  createProfile,
  editProfilePage,
  editProfile,
  deleteProfile,
};
