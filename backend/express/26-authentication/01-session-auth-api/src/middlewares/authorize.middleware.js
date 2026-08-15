import ApiError from "../utils/ApiError.js";

// ...allowedRoles = Rest parameter:
// Collects all arguments passed to authorize() into an array.
// Example: authorize("admin", "manager") → ["admin", "manager"]
// Then allowedRoles.includes(req.user.role) checks if the user's role is allowed.
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You are not allowed to perform this action"),
      );
    }
    next();
  };
};

export default authorize;
