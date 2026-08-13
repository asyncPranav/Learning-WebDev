import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }); // Fetch tasks that belong to the authenticated user

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }

    res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      completed,
      userId: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "task created successfully",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const updatedData = {};

    if (title !== undefined) {
      updatedData.title = title;
    }

    if (description !== undefined) {
      updatedData.description = description;
    }

    if (completed !== undefined) {
      updatedData.completed = completed;
    }

    if (Object.keys(updatedData).length === 0) {
      return next(new ApiError(400, "No valid fields provided for update"));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return next(new ApiError(404, "Task not found"));
    }

    res.status(200).json({
      status: "success",
      message: "task updated successfully",
      data: { task: updatedTask },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return next(new ApiError(404, "Task not found"));
    }

    res.status(200).json({
      status: "success",
      message: "task deleted successfully",
      data: { deletedTask },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
