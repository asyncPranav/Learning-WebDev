import dotenv from "dotenv";
import express from "express";

import userRouter from "./routes/user.route.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", ejs);

// routes
app.use("/users", userRouter);

const startServer = async () => {
  try {
    // connect to database
    await connectDB();

    // start the server after db connection
    app.listen(PORT, () => {
      console.log(`Server started at port 3000`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};
startServer();
