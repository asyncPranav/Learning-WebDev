import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const authenticate = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access. Please log in.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    // What is done below ?
    // 1. We are attaching the authenticated user object to the request object (req.user) so that it can be accessed in subsequent middleware or route handlers.
    // 2. This allows us to have access to the authenticated user's information throughout the request lifecycle, enabling us to implement authorization checks or access user-specific data in later parts of the application.
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
