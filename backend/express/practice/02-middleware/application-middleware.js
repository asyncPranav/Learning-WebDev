const express = require("express");
const app = express();

// # application middleware

// 1. Global middleware: runs for every request
app.use((req, res, next) => {
  console.log("This middleware runs for every request");
  next();
});

// we can also define middleware as saparate function
function logRequest(req, res, next) {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
}
app.use(logRequest);

// 2. Path-specific middleware: runs only for specific routes
app.use("/about", (req, res, next) => {
  console.log("This middleware runs only for /about route");
  next();
});

// we can also define path-specific middleware as a separate function
function middlewareForAbout(req, res, next) {
  console.log("This middleware runs only for /about route");
  next();
}
app.use("/about", middlewareForAbout);

// 3. Route-level middleware: runs only for specific route handlers
function middlewareForContact(req, res, next) {
  console.log("This middleware runs only for /contact route");
  next();
}

// routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", middlewareForContact, (req, res) => {
  res.send("Contact page");
});

// start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
