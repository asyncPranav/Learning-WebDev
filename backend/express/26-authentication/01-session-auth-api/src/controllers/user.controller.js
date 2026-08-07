import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(409, "Email is already registered"));
    }

    const user = await User.create({ name, email, password });

    // refer 06-why-return-custom-user-response
    res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
/* 
POST /api/users
        ↓
user.validator.js
        ↓
body("name")
body("email")
body("password")
        ↓
validation middleware
        ↓
validationResult(req)
        ↓
       valid?
      /      \
    NO        YES
    ↓          ↓
ApiError    createUser
    ↓          ↓
next(error)  User.findOne()
    ↓          ↓
errorHandler existing?
              /    \
            YES     NO
             ↓       ↓
          ApiError  User.create()
             ↓       ↓
          409       201
*/

const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const updatedData = {};

    // --> No need to check, findByIdAndUpdate will return null if the user doesn't exist, and we can handle that case after the update operation.
    // const existingUser = await User.findById(req.params.id);
    // if (!existingUser) {
    //   const error = new ApiError(404, "User not found");
    //   return next(error);
    // }

    if (name !== undefined) updatedData.name = name;

    // Why we use $ne operator here?
    // refer note 09-ne-operator-mongodb
    if (email !== undefined) {
      const userWithSameEmail = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (userWithSameEmail) {
        return next(new ApiError(409, "Email is already registered"));
      }

      updatedData.email = email;
    }

    if (password !== undefined) updatedData.password = password;

    // check for empty patch request
    // refer 08-handeling-empty-patch-request
    if (Object.keys(updatedData).length === 0) {
      return next(new ApiError(400, "No valid fields provided for update"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json({
      status: "success",
      message: "user updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    // Why we sapatelly handling E11000 ?
    // Refer 09-why-handle-E11000
    if (error.code === 11000) {
      return next(new ApiError(409, "Email is already registered"));
    }
    next(error);
  }
};
/* 
PATCH /api/users/:id
        ↓
validateObjectId
        ↓
Is ObjectId valid?
       / \
     NO   YES
     ↓     ↓
ApiError  updateUser
  400       ↓
     ↓    destructure
errorHandler
           ↓
      name, email, password
           ↓
      updatedData = {}
           ↓
      Is email provided?
         /        \
       NO          YES
       ↓            ↓
    continue   User.findOne({ email })
                    ↓
              existing user?
                 /     \
               YES      NO
                ↓        ↓
             ApiError  continue
               409        |
                ↓         |
          errorHandler    |
                          |
                          ↓
                  Add provided fields
                          ↓
                  name → updatedData
                  email → updatedData
                  password → updatedData
                          ↓
                  Is updatedData empty?
                          /       \
                        YES        NO
                        ↓          ↓
                      ApiError   User.findByIdAndUpdate()
                        400             ↓
                        ↓          select("-password")
                    errorHandler         ↓
                                    User found?
                                    /       \
                                  NO         YES
                                  ↓           ↓
                                ApiError      200
                                  404          ↓
                                  ↓       Send updated
                              errorHandler    user
*/

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).select(
      "-password",
    );
    if (!deletedUser) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json({
      status: "success",
      message: "user deleted successfully",
      data: { deletedUser },
    });
  } catch (error) {
    next(error);
  }
};
/* 
DELETE /api/users/:id
        ↓
validateObjectId
        ↓
deleteUser controller
        ↓
findByIdAndDelete()
        ↓
      result
      /    \
   null    user
    ↓       ↓
  404      200
    ↓       ↓
ApiError  deletedUser
*/

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
