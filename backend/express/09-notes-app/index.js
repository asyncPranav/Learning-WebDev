const express = require("express");
const mongoose = require("mongoose");
const Notes = require("./models/notes.model");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/notes-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes

app.get("/", async (req, res) => {
  const notes = await Notes.find();
  // res.json(notes)
  res.render("home", { notes: notes });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/view/:id", async (req, res) => {
  const note = await Notes.findById(req.params.id);
  res.render("show", { note: note });
});

app.post("/new", async (req, res) => {
  await Notes.create(req.body);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const note = await Notes.findById(req.params.id);
  // res.json(note)
  res.render("edit", { note: note });
});

app.post("/edit/:id", async (req, res) => {
  await Notes.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  await Notes.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
