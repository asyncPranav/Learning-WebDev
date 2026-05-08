import express from "express";
import connectDB from "./config/database.js";
import profileRouter from "./routes/profile.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
const PORT = 3000;
const app = express();

// Middlewares
app.set("view engine", "ejs")
app.use(express.json()); // used for if user sends data in json format
app.use(express.urlencoded({ extended: true })); // used for if user sends data in form format
app.use(express.static("public")); // for serving static files like css, js, images

// Routes
app.use("/", profileRouter)
app.use((req, res) => {
  res.status(404).render("404", {
    message: "Page not found",
  });
});

// Centralized error handling middleware
app.use(errorHandler); 


// Connect DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();