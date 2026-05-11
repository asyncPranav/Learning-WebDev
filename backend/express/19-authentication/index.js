const express = require("express");
const app = express();

const session = require("express-session");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("./model/user.model");

// Database connection
mongoose
  .connect("mongodb://localhost:27017/user-auth-demo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Session configuration
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
  }),
);

// This middleware checks if the user is logged in by verifying if the session contains a user. If the user is not logged in, it redirects them to the login page. This ensures that only authenticated users can access certain routes.
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// Routes
app.get("/", isLoggedIn, (req, res) => {
  res.render("home", { user: req.session.user || null });
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// Read obsidian :
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Temporily showing the hashed password in response
  // res.send({ username: username, password: hashedPassword });

  /* 
    // Create a new user
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
  */

  // This Model.create() method is a shortcut for creating and saving a new user in one step.
  // It takes an object with the username and hashed password, creates a new user document, and saves it to the database.
  // But internally Model.create() method uses new Model() to create a new instance of the user and then calls save() on that instance to persist it to the database.
  // After the user is created, it redirects to the login page.
  await User.create({ username: username, password: hashedPassword });
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  // If the user is already logged in, redirect to home page : stop him to open /login via url
  if (req.session.user) {
    return res.redirect("/");
  }

  const { username, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ username: username });
  if (!user) {
    return res
      .status(400)
      .render("login", { error: "Invalid username or password" });
  }

  // Compare the provided password with the hashed password in the database : return true or false
  const isPasswordvalid = await bcrypt.compare(password, user.password);
  if (!isPasswordvalid) {
    return res
      .status(400)
      .render("login", { error: "Invalid username or password" });
  }

  // Set user session
  req.session.user = username;

  // Redirect to home page after successful login
  res.redirect("/");
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log(`Server started at : https://localhost:3000`);
});
