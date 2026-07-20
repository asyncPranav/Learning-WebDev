const express = require("express");
const app = express();
const router = require("./routes/user.route.js");

// App middleware
app.use((req, res, next) => {
  console.log("Application middleware : for all routes");
  next();
});

// Route
app.use("/", router);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
