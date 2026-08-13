import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";

const checkTaskOwnership = async (req, res, next) => {
  try {
    // 1. Fetch the task by ID from the database
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }

    // 2. Check if the authenticated user is the owner of the task
    if (task.userId.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, "You are not allowed to access this task"));
    }

    // 3. If the user is the owner, Attach the task to the request object for further use in the route handler
    req.task = task;

    // 4. Proceed to the next middleware or route handler
    next();

  } catch (error) {
    next(error);
  }
};

export default checkTaskOwnership;
