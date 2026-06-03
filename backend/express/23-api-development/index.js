const express = require("express");
const app = express();

const connectDB = require("./config/db");
const studentsRouter = require("./routes/students.route");

const multer = require("multer"); // for error handling in the error handling middleware for multer errors

const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// use students router
app.use("/api/students", studentsRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    return res.status(400).json({ multer_error: err.message });
  } else if (err) {
    // Handle general errors
    return res.status(500).json({ server_error: err.message });
  }
  next();
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
