import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;