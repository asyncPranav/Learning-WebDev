import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;