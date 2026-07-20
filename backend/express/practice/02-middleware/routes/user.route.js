const express = require("express");
const router = express.Router();

// # Router middleware

// 1. Router level middleware
router.use((req, res, next) => {
  console.log(
    `Router level middleware: run for all requests - ${req.method} ${req.url}`,
  );
  next();
});

// we can also define middleware as saparate function
function routerLevelMiddleware(req, res, next) {
  console.log(
    `Router level middleware: run for all requests - ${req.method} ${req.url}`,
  );
  next();
}
router.use(routerLevelMiddleware);

// 2. Path specific middleware
router.use("/admin", (req, res, next) => {
  console.log(`Path specific middleware : for /admin route only`);
  next();
});

// we can also define middleware as saparate function
function middlewareForAdmin(req, res, next) {
  console.log(`Path specific middleware : for /admin route only`);
  next();
}
router.use("/admin", middlewareForAdmin);

// 3. Route level middleware
function middlewareForContact(req, res, next) {
  console.log("Route level middleware : for /contact route only");
}

// Routes
router.get("/", (req, res) => {
  res.send("User route - Home page");
});

router.get("/profile", (req, res) => {
  res.send("User route - Profile page");
});

router.get("/admin", (req, res) => {
  res.send("User route - Admin page");
});

router.get("/contact", middlewareForContact, (req, res) => {
  res.send("User route - Contact page");
});

module.exports = router;
