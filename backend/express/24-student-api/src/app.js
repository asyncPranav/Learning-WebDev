import express from "express";

import errorHandler from "./middlewares/errorHandler.middleware.js";
import router from "./routes/student.route.js";
import notFound from "./middlewares/notFound.middleware.js";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// student routes
app.use("/api/student", router);

// Middleware to handle 404 errors for undefined routes
app.use(notFound);

// global error handling middleware
app.use(errorHandler);

export default app;
