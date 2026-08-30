import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores",
      ],
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      // match: [
      //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      //   "Please provide a valid email address",
      // ],
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: "Please provide a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      // minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function(password) {
          console.log(password);
          // return validator.isStrongPassword(password)  // here it applies default options of isStrongPassword method, but we can also customize it as below
          return validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 0,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message: "Password must be at least 8 characters long and include at least one lowercase letter, one number, and one symbol",
      }
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not a valid gender",
      },
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [13, "Age must be at least 13"],
      max: [120, "Age cannot exceed 120"],
    },

    about: {
      type: String,
      trim: true,
      maxlength: [500, "About cannot exceed 500 characters"],
      default: "",
    },

    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (skills) {
          return skills.length <= 10;
        },
        message: "You can add a maximum of 10 skills",
      },
    },

    photoUrl: {
      type: String,
      trim: true,
      default: function () {
        return `https://api.dicebear.com/10.x/glyphs/svg?seed=${this.username}`;
      },
      validate: {
        validator: function(url) {
          return validator.isURL(url);
        },
        message: "Please provide a valid photo URL",
      }
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;