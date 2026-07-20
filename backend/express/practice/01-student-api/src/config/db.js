import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection error : " + error);
    process.exit(1);
  }
};

export default connectDB;
