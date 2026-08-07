import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server has started as port ${PORT}`);
    });
  } catch (err) {
    console.log("Server starting failed : " + err.message);
    process.exit(1);
  }
};


startServer();