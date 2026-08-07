import express from "express";

// custom middlewares
import errorHandler from "./middlewares/errorHandler.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

// routers
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();

// middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// 404 - not found middleware
app.use(notFound);

// global error handling middleware
app.use(errorHandler);

export default app;