import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError("Email already exists", 400));
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Never send password back to the client
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    // Handle MongoDB duplicate email race condition
    if (error.code === 11000) {
      return next(new ApiError("Email already exists", 400));
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    // 2. Compare submitted password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    // 3. Create authenticated session
    req.session.userId = user._id;

    // Temporary response — session comes next
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  // 1. Destroy the session on the server side
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    // 2. Clear the session cookie on the client side - assuming the cookie name is 'connect.sid' (default for express-session)
    res.clearCookie("connect.sid");

    // 3. Send a response indicating successful logout
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  });
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getMe };
