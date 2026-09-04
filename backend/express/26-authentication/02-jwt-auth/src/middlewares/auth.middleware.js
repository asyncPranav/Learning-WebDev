import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";

const authenticate = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new ApiError(401, "No token provided");
    }

    // Extract the token from the "Bearer <token>" format
    /*  
      const token = authorizationHeader.split(" ")[1];
      if (!token) {
        throw new ApiError(401, "No token provided");
      } 
    */
   
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      throw new ApiError(401, "Invalid authorization format");
    }

    // Verify the token - if it fails, jwt.verify will throw an error which will be caught in the catch block
    const decoded = jwt.verify(token, config.jwtSecret);

    

    // Attach the decoded user information to the request object
    // decoded - { sub: 'user_id', sid: 'session_id', iat: 1690000000, exp: 1690003600 }
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
