const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

// route with an error
app.get("/error", (req, res) => {
  // throw new Error("This is an error!");
  res.sen("<h1>Error page</h1>");
});

// 404 error handling middleware - it will run only when there is a 404 error in any of the routes defined before it. It will not run for any route defined after it because it is defined after all the routes.
app.use((req, res) => {
  res.status(404).send("Page not found!");
});


// Error handling middleware - defined after all the routes, so it will run only when there is an error in any of the routes defined before it. 
// It will not run for any route defined after it because it is defined after all the routes.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");

});


app.listen(3000, () => {
  console.log("Server has been started at port 3000");
});