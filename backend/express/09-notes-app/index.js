require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Notes = require("./models/notes.model");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.render("home", { notes });
  } catch (err) {
    res.status(500).send("Database error");
  }
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/view/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.render("show", { note });
  } catch (err) {
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  await Notes.create(req.body);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.render("edit", { note });
  } catch (err) {
    res.redirect("/");
  }
});

app.post("/edit/:id", async (req, res) => {
  await Notes.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  await Notes.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Connect then start server
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("DB Error:", err);
    process.exit(1);
  }
}

connectDB();