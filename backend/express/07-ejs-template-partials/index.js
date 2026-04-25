const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the EJS Template Partials Example!');
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Home Page", message: "" });
});

app.post("/submit", (req, res) => {
  const { myname } = req.body;

  const message = `Hello ${myname}! You have submitted your form.`;

  res.render("home", {
    title: "Home Page",
    message
  });
});

app.get('/about', (req, res) => {
  res.render('aboutus', { title: "About Us" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});