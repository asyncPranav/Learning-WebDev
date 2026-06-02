const express = require("express");
const app = express();

// Import Cookie Parser and CSRF Middleware
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

// middlewares to handle form data and JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Set up middlewares for cookie parsing and CSRF protection
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

// routes
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/form", csrfProtection, (req, res) => {
  res.render("form", { csrfToken: req.csrfToken() });
});

app.post("/submit", csrfProtection, (req, res) => {
  res.send(req.body);
});

// start the server
app.listen(3000, () => {
  console.log("Server has been started on port 3000");
});
