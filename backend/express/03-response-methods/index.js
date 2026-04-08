const express = require("express");
const app = express();
const PORT = 3000;

// Basic routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/users", (req, res) => {
  res.send("Users page");
});










/*
  Express.js res.send() Example – Sending JSON and Arrays

  Key Concepts for Beginners:
  1. res.send() is used to send a response from the server to the client.
  2. You can send different types of data using res.send():
     - String → res.send("Hello")
     - Object → res.send({ name: "Pranav" })
     - Array  → res.send(["Mango", "Banana"])
     - HTML   → res.send("<h1>Hello</h1>")
  3. When you send an object or array, Express automatically converts it to JSON.
  4. JSON responses are commonly used in APIs.
  5. The browser will display JSON data when visiting the route.

  Example:
  - Visiting http://localhost:3000/send
    -> Returns ["Mango", "Banana", "Apple"]

  Notes:
  - Objects are useful for structured data (user info, product info, etc.)
  - Arrays are useful for lists (fruits, users, items, etc.)
  - res.send() automatically sets Content-Type to application/json for objects/arrays
*/

app.get("/send", (req, res) => {
  // sent object but it will be converted to json and sent to the client
  res.send({
    name: "asyncpranav",
    age: 25,
    city: "Bangalore",
  });

  // sent array but it will be converted to json and sent to the client
  res.send(["Mango", "Banana", "Apple"]);
});










/*
  Express.js res.json() – Sending JSON Responses

  Key Concepts for Beginners:
  1. res.json() is used to send JSON data from the server to the client.
  2. It automatically converts JavaScript objects or arrays into JSON format.
  3. It also sets the correct response header: Content-Type: application/json.
  4. res.json() is mainly used when building APIs.
  5. You can send:
     - Object → res.json({ name: "Pranav" })
     - Array  → res.json([{ id: 1 }, { id: 2 }])

  Difference between res.send() and res.json():
  - res.send() → can send string, HTML, object, array, etc.
  - res.json() → specifically used for JSON responses
  - Both convert object/array to JSON, but res.json() is more explicit and preferred for APIs

  Example:
  - http://localhost:3000/json1 → returns single JSON object
  - http://localhost:3000/json2 → returns JSON array
*/

app.get("/json1", (req, res) => {
  // sent object but it will be converted to json and sent to the client
  res.json({
    name: "pranav singh chandel",
    age: 25,
    city: "Bangalore",
  });
});

app.get("/json2", (req, res) => {
  const users = [
    { id: 1, name: "pranav" },
    { id: 2, name: "ayush" },
    { id: 3, name: "vageesh" },
  ];
  // sent array but it will be converted to json and sent to the client
  res.json(users);
});










/*
  Express.js res.jsonp() – Sending JSONP Responses

  Key Concepts for Beginners:
  1. res.jsonp() is similar to res.json() but adds **JSONP support**.
  2. JSONP (JSON with Padding) allows **cross-domain requests** in older browsers where CORS isn't available.
  3. When using res.jsonp(), Express automatically wraps the JSON object in a callback function if a query parameter `callback` is provided.
     - Example URL: /jsonp?callback=handleResponse
     - Response sent to the browser: typeof handleResponse === 'function' && handleResponse({"id":1,"name":"pranav"});
  4. If no `callback` query is provided, it behaves like res.json() and sends normal JSON.
  5. Use JSONP only if you need to support cross-domain requests in older browsers; otherwise, use CORS + res.json().
  
  Example Usage:
  - http://localhost:3000/jsonp
    → Response: {"id":1,"name":"pranav"}  (no callback, normal JSON)
  - http://localhost:3000/jsonp?callback=myFunction
    → Response: typeof handleResponse === 'function' && handleResponse({"id":1,"name":"pranav"});  (wrapped in callback function)
*/

app.get("/jsonp", (req, res) => {
  // sent array but it will be converted to json and sent to the client
  res.jsonp({ id: 1, name: "pranav" });
});










/*
  Express.js res.redirect() – Redirecting Requests with Relative Paths

  Key Concepts for Beginners:

  1. res.redirect() is used to send the client to another URL or route.
  
  2. Types of redirect targets:
     - Absolute URLs → Full URL including protocol and domain
       Example: "https://github.com/asyncpranav"

     - Internal routes / Absolute paths → Start with "/"
       Example: "/users", "/about"
       Redirects to a route relative to your site root

     - Relative paths → Relative to the current URL
       Example: ".." → moves one level up from current path
       Example: "../about" → moves one level up and then to "about"
       Example: "./contact" → stays in current level, adds "contact"

  3. How relative paths work:
     - Suppose current URL is: http://localhost:3000/blog/post1
       - ".." → http://localhost:3000/blog → moves up one level
       - "../about" → http://localhost:3000/about → moves up one level and adds "about"
       - "./contact" → http://localhost:3000/blog/contact → stays in current level, adds "contact"

  4. Optional HTTP status codes:
     - 301 → Permanent Redirect (search engines update URL)
     - 302 → Found / Temporary Redirect (default if not specified)
     - 303 → See Other (commonly used after POST requests)

  5. Key Notes:
     - Always decide whether the redirect should be temporary or permanent
     - Relative redirects are convenient for internal navigation without hardcoding full paths
     - Absolute paths (starting with "/") are preferred for clarity in internal site redirects
*/

app.get("/redirect1", (req, res) => {
  res.redirect("https://github.com/asyncpranav");
});

app.get("/redirect2", (req, res) => {
  res.redirect("/users");
});

app.get("/redirect3", (req, res) => {
  res.redirect(301, "https://github.com/asyncpranav");
});

app.get("/redirect4", (req, res) => {
  res.redirect(302, "https://github.com/asyncpranav");
});

app.get("/redirect5", (req, res) => {
  res.redirect(303, "https://github.com/asyncpranav");
});

app.get("/redirect6", (req, res) => {
  res.redirect("..");
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
