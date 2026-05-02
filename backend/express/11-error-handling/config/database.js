import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/* 
  const connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Database connected"))
      .catch((err) => console.log(err));
  };
 */

// Better way to write above code using async-await
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
