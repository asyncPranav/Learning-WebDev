// This file is created in JWT tutorial lecture

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization; // it is same as req.headers["authorization"]
    console.log("bearerHeader :", bearerHeader); // for logging the value of bearerHeader to the console for debugging purposes

    if (!bearerHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // const bearer = bearerHeader.split(" ");
    // const token = bearer[1];
    const token = bearerHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user : ", user); // it shows the decoded payload of the JWT token, which typically contains user information such as userId and username. This is useful for debugging and verifying that the token is valid and contains the expected data.
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: `Invalid or expired token: ${error.message}`,
    });
  }
};

module.exports = auth;
