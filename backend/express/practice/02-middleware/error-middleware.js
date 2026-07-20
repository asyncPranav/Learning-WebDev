const express = require("express");
const app = express();

// Normal Middleware
function logger(req, res, next) {
  console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
}
app.use(logger); // Apply logger middleware to all routes

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/error", (req, res, next) => {
  // Simulate an error
  const err = new Error("Something went wrong!");
  next(err); // Pass the error to the error-handling middleware
});

// Error-handling Middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
}
app.use(errorHandler); // Apply error-handling middleware

// Start server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});


