/*    
  Here in this file we learnt about application level middleware in express. 
  Middleware is a function that has access to the request and response objects and 
  can modify them or perform some actions before passing control to the next middleware 
  or route handler. We can define middleware at the application level, which means it will 
  run for all routes defined after it, or we can define middleware for specific routes only. 
  In this file, we have defined some custom middleware and used them in different ways to 
  demonstrate how they work. 
*/

const express = require("express");
const app = express();

// Middleware will not run for this route because it is defined before the middleware
app.get("/no-middleware-run", (req, res) => {
  res.send("<h1>No middleware run</h1>");
});

// Custom middleware - it will run for all routes defined after this middleware
app.use((req, res, next) => {
  const d = new Date();
  console.log(`Hello from middleware - ${req.method} ${req.url} - ${d.toLocaleDateString()} ${d.toLocaleTimeString()}`);
  next();
});

// Custom middleware - it will run for all routes defined after this middleware but it is defined as a separate function for better readability
const myMiddleware = (req, res, next) => {
  console.log("Hello from myMiddleware");
  next();
};
app.use(myMiddleware);

// Custom middleware - it will run only for the /about route because it is defined as a separate middleware for this route
const middlewareForAbout = (req, res, next) => {
  console.log("Hello from middlewareForAbout");
  next();
};

// Custom middleware - it will run only for the /contact route because it is defined as a separate middleware for this route
const middlwareForContact = (req, res, next) => {
  console.log("Hello from middlewareForContact");
  next();
};

const anotherMiddlewareForContact = (req, res, next) => {
  console.log("Hello from anotherMiddlewareForContact");
  next();
};

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

// This route will have the middlewareForAbout run only for this route because it is defined as a separate middleware for this route
app.get("/about", middlewareForAbout, (req, res) => {
  res.send("<h1>About page</h1>");
});

// This route will have both middlwareForContact and anotherMiddlewareForContact run only for this route because they are defined as separate middleware for this route
app.get("/contact", middlwareForContact, anotherMiddlewareForContact, (req, res) => {
  res.send("<h1>About page</h1>");
});

app.listen(3000, () => {
  console.log("Server has been started at port 3000");
});
