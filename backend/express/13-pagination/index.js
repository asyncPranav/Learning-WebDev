import express from "express";
import router from "./routes/contacts.routes.js";
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/", router);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).render("404", {
    message: "Page not found",
  });
});

// Safe server start
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });

  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();