import express from "express";
const app = express();
import router from "./routes/student.route.js";

// Middleware
app.use(express.json());

// Routes
app.use("/students", router);
app.use((req, res) => {
  res.status(404).json({ error: "Undefined route" });
});

export default app;
