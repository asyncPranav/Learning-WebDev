import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection succeeded");
  } catch (error) {
    console.log("Database connection failed :" + error.message);
    process.exit(1); // Exit the application if DB connection fails
  }
};

export default connectDB;
