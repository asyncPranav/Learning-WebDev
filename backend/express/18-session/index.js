const express = require("express");
const app = express();
const session = require("express-session");

// Generally sessions are stored in system's memory i.e RAM, but in production environments, it's recommended to use a more robust session store like Redis or MongoDB to handle sessions efficiently and persistently.
// Here we will use connect-mongo to store sessions in MongoDB, which is a popular choice for session storage in production environments. It provides a simple and efficient way to store session data in a MongoDB database, allowing for better scalability and reliability compared to in-memory storage.
// Modern version of connect-mongo uses ES6 module syntax, so we need to use the .default property to access the default export when importing it in a CommonJS environment like Node.js. This is because the default export is wrapped in an object when imported using require(), and we need to access the .default property to get the actual default export of the module.
const MongoStore = require("connect-mongo").default;

// configure session middleware
app.use(
  session({
    secret: "secret-password",
    resave: false,
    saveUnlimited: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessionDB",

      // By default, connect-mongo will create a collection named "sessions" in the specified MongoDB database to store session data. You can customize the collection name by providing the "collectionName" option when creating the MongoStore instance. For example:
      collectionName: "mySessions",

      // We can also set the time-to-live (TTL) for sessions in MongoDB using the "ttl" option. This option specifies the duration (in seconds) for which a session should be stored in the database before it expires. For example, to set a TTL of 1 hour (3600 seconds), you can use:
      ttl: 3600, // session expires after 1 hour : same as cookie maxAge, if ttl is set then you can remove cookie maxAge, because ttl will handle session expiration in MongoDB, and the cookie will simply be a reference to the session stored in the database. However, if you want to keep the cookie expiration in sync with the session expiration in MongoDB, you can set both ttl and cookie maxAge to the same value (e.g., 3600 seconds for 1 hour) to ensure that the session expires consistently on both the client and server sides.

    }),
    cookie: { maxAge: 100 * 60 * 60 }, // session expires after 1 hour
  }),
);

// route to set session data
app.get("/set-username", (req, res) => {
  req.session.username = "asyncpranav";
  res.send("<h1>Username has been set in session</h1>");
});

// route to get session data
app.get("/get-username", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>Username from Session data: ${req.session.username}</h1>`);
  } else {
    res.send("<h1>No session data found</h1>");
  }
});

// route to display welcome message using session data
app.get("/about", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>Welcome, ${req.session.username}!</h1>`);
  } else {
    res.send("<h1>Please set your username first.</h1>");
  }
});

// route to destroy session
app.get("/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("<h1>Error destroying session</h1>");
    } else {
      res.send("<h1>Session destroyed successfully</h1>");
    }
  });
});

// start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
