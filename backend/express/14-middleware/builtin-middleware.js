const express = require("express");
const app = express();

/*
  ========================= BUILT-IN EXPRESS MIDDLEWARE =========================
 
  Middleware = functions that run between request (client) and response (server).
  They can modify req (request), res (response), or end the request-response cycle.
 
  ------------------------------------------------------------------------------
  1. express.static(rootFolder, [options])
  ------------------------------------------------------------------------------
  WHAT:
  Serves static files (HTML, CSS, JS, images, videos, etc.) directly to the client.
 
  WHEN TO USE:
  - When you have frontend files (like index.html, styles.css, script.js)
  - When you want browser to access files without creating routes manually
 
  EXAMPLE:
  If you have: public/index.html
  Visiting: http://localhost:3000/index.html → will serve that file
 
  PARAMETERS:
  - rootFolder (string): folder name where static files are stored
  - options (optional object):
     - maxAge → cache control (e.g., '1d')
     - index → default file (e.g., 'index.html')
     - extensions → try extensions automatically (['html'])
 
  NOTE:
  - Path is relative to project root unless you use absolute path
  - Place this middleware at the TOP for better performance
*/
app.use(express.static("public"));



/*
  ------------------------------------------------------------------------------
  2. express.json([options])
  ------------------------------------------------------------------------------
  WHAT:
  Parses incoming requests with JSON payloads.
  Converts JSON string → JavaScript object and stores it in req.body
 
  WHEN TO USE:
  - APIs (REST APIs)
  - When client sends JSON (Content-Type: application/json)
  - Common in POST, PUT, PATCH requests
 
  EXAMPLE REQUEST BODY:
  {
    "name": "John",
    "age": 25
  }
 
  ACCESS IN ROUTE:
  req.body.name → "John"
 
  PARAMETERS (optional):
  - limit → max request body size (e.g., "10mb")
  - strict → only accept arrays/objects (default: true)
  - type → customize which content-type to parse
 
  IMPORTANT:
  - If you don’t use this middleware, req.body will be undefined for JSON
*/
app.use(express.json());



/*
  ------------------------------------------------------------------------------
  3. express.urlencoded([options])
  ------------------------------------------------------------------------------
  WHAT:
  Parses URL-encoded data (form submissions).
  Converts form data → JavaScript object and stores it in req.body
 
  WHEN TO USE:
  - HTML form submissions
  - Content-Type: application/x-www-form-urlencoded
 
  EXAMPLE FORM DATA:
  name=John&age=25
 
  ACCESS IN ROUTE:
  req.body.name → "John"
 
  PARAMETERS:
  - extended (boolean):
       false → uses querystring library (simple key-value pairs)
       true  → uses qs library (supports nested objects)
 
       Example with extended: true
       user[name]=John → { user: { name: "John" } }
 
  - limit → max size of form data (e.g., "5mb")
 
  BEST PRACTICE:
  - Use extended: true for modern apps (more flexible)
 */
app.use(express.urlencoded({ extended: true }));



/**
 * ========================= SUMMARY =========================
 *
 * express.static()     → for serving frontend files (HTML, CSS, JS, images)
 * express.json()       → for handling JSON data (APIs, frontend frameworks)
 * express.urlencoded() → for handling form submissions
 *
 * ORDER MATTERS:
 * 1. static files
 * 2. body parsers
 * 3. routes
 *
 * Without these middlewares:
 * - req.body will NOT work properly
 * - Static files won't be accessible
 */



app.get("/", (req, res) => {  
  res.send("<h1>Home page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.listen(3000, () => {
  console.log("Server has been started at port 3000");
});
