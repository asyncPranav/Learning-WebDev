/* 
Here in this file we learnt about router level middleware in express. 
Router level middleware is similar to application level middleware but it is defined 
for a specific router instead of the entire application. This means that the middleware 
will only run for routes defined in that router and not for any other routes defined in 
the application. We can define router level middleware using the router.use() method, 
which works similarly to the app.use() method for application level middleware. 
can also define custom middleware for specific routes in the router by passing the 
middleware function as an argument to the route handler. 

In this file, we have defined some custom middleware and used them in different ways to 
demonstrate how they work with routers in express.
*/
const express = require("express");
const app = express();
const router = express.Router();

// Router middleware - it will run for all routes defined in this router because it is defined before the routes
router.use((req, res, next) => {
  const d = new Date();
  console.log(
    `Hello from router middleware - ${req.method} ${req.url} - ${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
  );
  next();
});

// Name based router middleware - it will run for all routes defined in this router because it is defined before the routes
const myRouterMiddleware = (req, res, next) => {
  console.log("Hello from myRouterMiddleware");
  next();
};
router.use(myRouterMiddleware);

// We can also define custom middleware for this router as a separate function for better readability
const myRouterMiddlewareForContact = (req, res, next) => {
  console.log("Hello from myRouterMiddleware for Contact page");
  next();
};

// Routes
router.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

router.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

// This route will have the myRouterMiddlewareForContact run only for this route because it is defined as a separate middleware for this route
router.get("/contact", myRouterMiddlewareForContact, (req, res) => {
  res.send("<h1>Contact page</h1>");
});

// This app.use() will mount the router middleware at the root path, so it will run for all routes defined in this router
// If we want to mount the router middleware at a different path, we can specify that path as the first argument of app.use() method. For example, if we want to mount the router middleware at the /api path, we can do it like this: app.use("/api", router); In this case, the router middleware will run only for routes that start with /api, so it will run for /api/ and /api/about but it will not run for /about or /contact.
// If we forget to use app.use() method to mount the router middleware, the router middleware will not run for any route defined in this router because it is not mounted at any path. In this case, we will get a 404 error for all routes defined in this router because the router middleware is not running and it is not able to handle the requests for these routes.
app.use("/", router);

app.listen(3000, () => {
  console.log("Server has been started at port 3000");
});