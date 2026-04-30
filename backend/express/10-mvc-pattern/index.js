import express from "express";
import router from "./routes/contacts.routes.js";
import connectDB from "./config/database.js";
import Contact from "./models/contacts.models.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
connectDB();

// Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/", router);
// app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
