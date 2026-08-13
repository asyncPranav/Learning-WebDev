import express from "express";

// custom middlewares
import errorHandler from "./middlewares/errorHandler.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";
import sessionMiddleware from "./middlewares/session.middleware.js";

// routers
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

// middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware (order matters, should be before routes that require session)
app.use(sessionMiddleware);

// routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

// 404 - not found middleware
app.use(notFound);

// global error handling middleware
app.use(errorHandler);

export default app;