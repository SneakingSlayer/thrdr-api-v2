import mongoose from "mongoose";
import {
  isCorrectLength,
  isValidEmail,
  checkEmail,
  checkUsername,
  isStrongPassword,
} from "../utils/validators";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: [
        {
          validator: (str: string) => isCorrectLength(str, 2, "min"),
          message: "First name must be 2 or more characters.",
        },
        {
          validator: (str: string) => isCorrectLength(str, 50, "max"),
          message: "First name must be less than 50 characters.",
        },
      ],
    },
    lastName: {
      type: String,
      required: true,
      validate: [
        {
          validator: (str: string) => isCorrectLength(str, 2, "min"),
          message: "Last name must be 2 or more characters.",
        },
        {
          validator: (str: string) => isCorrectLength(str, 50, "max"),
          message: "Last name must be less than 50 characters.",
        },
      ],
    },
    userName: {
      type: String,
      required: true,
      validate: [
        {
          validator: (str: string) => isCorrectLength(str, 5, "min"),
          message: "Username must be 5 or more characters.",
        },
        {
          validator: (str: string) => isCorrectLength(str, 50, "max"),
          message: "Username must be less than 50 characters.",
        },
        {
          validator: async (username: string) => {
            return await checkUsername(username);
          },
          message: "Username already in use.",
        },
      ],
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          validator: isValidEmail,
          message: "Invalid email address.",
        },
        {
          validator: async (email: string) => {
            return await checkEmail(email);
          },
          message: "Email already in use.",
        },
      ],
    },
    password: {
      type: String,
      required: true,
      validate: [
        {
          validator: (str: string) => isCorrectLength(str, 8, "min"),
          message: "Password must be 8 or more characters.",
        },
        {
          validator: isStrongPassword,
          message:
            "Password must be atleast 8 characters and contains alteast 1 special character or 1 number.",
        },
      ],
    },
    description: {
      type: String || null,
      required: false,
    },
    avatar: {
      type: String || null,
      required: false,
    },
    log: {
      ip: {
        type: String,
        required: false,
      },
      device: {
        type: String,
        required: false,
      },
      browser: {
        type: String,
        required: false,
      },
      location: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
