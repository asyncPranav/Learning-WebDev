import mongoose from "mongoose";
import validator from "validator";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "Invalid email format",
      },
    },

    otpHash: {
      type: String,
      required: [true, "OTP hash is required"],
    },

    purpose: {
      type: String,
      enum: ["email_verification", "password_reset"],
      required: [true, "Purpose is required"],
    },

    expiresAt: {
      type: Date,
      required: [true, "OTP expiration time is required"],
    },

    attempts: {
      type: Number,
      default: 0,
      max: [3, "Maximum of 3 attempts allowed"], // Limit the number of attempts to 3 i.e if the user enters the wrong OTP 3 times, they will have to request a new OTP
    },
  },
  {
    timestamps: true,
  },
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
