import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    httpOnly: true, // Mitigate XSS attacks
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

export default sessionMiddleware;