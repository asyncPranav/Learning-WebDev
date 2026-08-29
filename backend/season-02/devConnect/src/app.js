import express from "express";
const app = express();

import User from "./models/User.model.js";

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, name, email, password, gender, age } = req.body;

  const newUser = new User({ username, name, email, password, gender, age });

  try {
    await newUser.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    user: {
      username,
      name,
      email,
      gender,
      age,
    },
  });
});

// Get /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// Get /user/:username - get a user by username
app.get("/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
});

// Get /user - get user by email (for demonstration, we will just return a dummy user)
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.send(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
});

// Get /user - get the logged-in user (for demonstration, we will just return a dummy user)

// Update /user/:userId - update a user by userId
app.patch("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
});

// Delete /user/:userId - delete a user by userId
app.delete("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
});

export default app;
