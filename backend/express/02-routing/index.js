const express = require("express");
const app = express();
const PORT = 3000;

// route handler for GET request to "/"
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

// route handler for GET request to "/about"
app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

// route handler for GET request to "/gallery"
app.get("/gallery", (req, res) => {
  res.send("<h1>Gallery page</h1>");
});









/*
  Express Route Example: Handling Specific vs General Routes

  Key Concepts for Beginners:
  1. Routes in Express define how your app responds to client requests (like visiting a URL).
  2. The order of routes matters: 
    - More specific routes should come **before** more general routes.
    - If a general route comes first, it might "catch" requests meant for a specific route.
    - routes can be defined in any order, but specific routes should come before general ones
  3. Syntax: app.get(path, callback)
    - 'path' is the URL you want to handle (e.g., "/about/user").
    - 'callback' is a function with two parameters: 'req' (request) and 'res' (response).
  4. 'req' holds information about the incoming request.
  5. 'res' lets you send data back to the browser (HTML, text, JSON, etc.).
  6. Example: 
    - "/about/user" is more specific than "/about".
    - Requests to "/about/user" should match the specific route first.

  In this code:
  - We define a GET route for "/about/user".
  - When someone visits this URL, we respond with a simple HTML page.
  - /about/user looks like a nested route because of the / structure.
  - But in Express, it’s just a single, specific route.
  - Express treats each route as a standalone path. There’s no hierarchy or nesting unless you explicitly use routers or express.Router().
*/
app.get("/about/user", (req, res) => {
  res.send("<h1>User page</h1>");
});







// routes can have dot dollar and other special characters in the path
// This is useful when URLs need to include special characters for formatting, pricing, or usernames
app.get("/random.page", (req, res) => {
  res.send("<h1>Random page</h1>");
});

app.get("/price$100", (req, res) => {
  res.send("<h1>Price page</h1>");
});

app.get("/person@name", (req, res) => {
  res.send("<h1>Person page</h1>");
});







/*
  Express.js Route Parameters – Beginner-Friendly Guide

  Key Concepts for Beginners:
  1. Routes define how your app responds to client requests (visiting a URL).
  2. Route parameters are dynamic parts of a URL and are prefixed with ":".
     - Example: "/admin/:id" captures whatever comes after "/admin/" as "id".
  3. Multiple parameters can exist in a single route.
     - Example: "/library/:libraryid/book/:bookid" captures both "libraryid" and "bookid".
  4. You can use custom separators between parameters.
     - Example: "/college/:collegeid-:studentid" captures "collegeid" and "studentid" separated by a dash.
  5. Accessing parameters:
     - Use `req.params` to get all parameters as an object.
     - Example: req.params.id, req.params.libraryid, req.params.bookid
  6. Sending responses:
     - Use `res.send()` to send text, JSON, or HTML back to the client.
  7. Testing:
     - Open a browser or Postman and try:
       http://localhost:3000/admin/123
       http://localhost:3000/library/1/book/101
       http://localhost:3000/college/10-2001
*/

app.get("/admin/:id", (req, res) => {
  res.send(req.params); // param is an object containing the route parameters
});

app.get("/library/:libraryid/book/:bookid", (req, res) => {
  res.send(
    "Library ID: " + req.params.libraryid + ", Book ID: " + req.params.bookid,
  );
});

app.get("/college/:collegeid-:studentid", (req, res) => {
  res.send(req.params);
});








/*
  Express Query Parameters: Capturing Data from the URL

  Key Concepts for Beginners:
  1. Query parameters are values added to the URL after a "?".
     - They are usually used to filter, search, or send extra data in GET requests.
     - Example: "/search?name=pranav" → "name" is the query parameter with value "pranav".
  2. Multiple query parameters can be added using "&":
     - "/search?name=pranav&age=25" → "name" = "pranav", "age" = "25"
     - "/search?name=pranav&age=25&city=delhi" → "name" = "pranav", "age" = "25", "city" = "delhi"
  3. Accessing query parameters:
     - Use `req.query` to get an object of all query parameters.
     - Example: req.query.name, req.query.age, req.query.city
  4. Sending response:
     - Use `res.send()` to send text, JSON, or objects back to the client.
  5. Query parameters are optional and order does not matter.
     - /search?name=pranav&age=25 is the same as /search?age=25&name=pranav
  6. Use query parameters for optional filters, search, or sorting.

  Example Usage in This Code:
  - Visiting http://localhost:3000/search?name=pranav
    -> req.query will be { name: 'pranav' }
  - Visiting http://localhost:3000/search?name=pranav&age=25
    -> req.query will be { name: 'pranav', age: '25' }
  - Visiting http://localhost:3000/search?name=pranav&age=25&city=delhi
    -> req.query will be { name: 'pranav', age: '25', city: 'delhi' }
*/
app.get("/search", (req, res) => {
  res.send(req.query); // query is an object containing the query parameters
});







/*
  Express Catch-All Route: Handling 404 Not Found

  Key Concepts for Beginners:
  1. A catch-all route matches any request that doesn't match previous defined routes.
     - It is defined using "*" as the path: app.get("*", callback)
  2. It should always be **defined at the end** of all other routes.
     - If defined earlier, it will catch all requests and other routes won't work.
  3. Common use case:
     - Display a custom 404 page or message when the user visits a non-existent URL.
  4. Sending response:
     - You can use res.send() to send HTML, text, or JSON back to the client.
  5. Example:
     - If a user visits http://localhost:3000/unknownpage
       and no route matches, the catch-all route will respond with a 404 message.
*/

// Old problematic route
/* 
  app.get("*", (req, res) => {
    res.send("<h1>404 Not Found</h1>");
  });
*/








/*
  Express.js 404 Error Handling using Middleware

  Key Concepts for Beginners:
  1. Middleware functions can handle requests that reach the end of your route chain.
  2. app.use((req, res) => {...}) without a path catches all requests that aren't matched by previous routes.
  3. res.status(404) sets the HTTP response status code to 404 (Not Found).
  4. res.send() sends a response to the client.
  5. This method works for all HTTP methods (GET, POST, PUT, DELETE, etc.), unlike app.get("*").
  6. Always place this middleware **after all other routes** to avoid blocking valid requests.
  
  Example:
    - Visiting http://localhost:3000/nonexistent
      -> Returns 404 status with "<h1>404 Not Found</h1>".
*/
app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
