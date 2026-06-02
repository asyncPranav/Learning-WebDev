const express = require("express");
const app = express();

const connectDB = require("./config/db");
const studentsRouter = require("./routes/students.route");

const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// use students router
app.use("/api/students", studentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
