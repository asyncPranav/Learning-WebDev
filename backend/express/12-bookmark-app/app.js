import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// routes
app.use("/", bookmarkRoutes);
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// start server
const startServer = async() => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}

startServer();