import "dotenv/config";
import dns from "node:dns";
import app from "./app.js";
import connectDB from "./config/database.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Method-01
/* 
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
      console.log("Server has successfully started on port 3000");
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed");
    process.exit(1);
  });
*/

// Method-02
const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("server has been started on port 3000");
    });
  } catch (error) {
    console.log("Mongodb connection failed : " + error.message);
    process.exit(1);
  }
};

startServer();

// Note : Both methods are same, but method-02 is more readable and easy to understand.
