import mongoose from "mongoose";
import { isCorrectLength } from "../utils/validators";

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: [
        {
          validator: (title: string) => isCorrectLength(title, 5, "min"),
          message: "Title must have atleast 5 characters",
        },
        {
          validator: (title: string) => isCorrectLength(title, 150, "max"),
          message: "Title must be less than or equal to 150 characters",
        },
      ],
    },
    description: {
      type: String,
      required: true,
      validate: [
        {
          validator: (title: string) => isCorrectLength(title, 5, "min"),
          message: "Description must have atleast 20 characters",
        },
        {
          validator: (title: string) => isCorrectLength(title, 600, "max"),
          message: "Title must be less than or equal to 600 characters",
        },
      ],
    },
    createdBy: {
      id: {
        type: String || null,
        required: false,
      },
      userName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String || null,
        required: false,
      },
    },
    createdFor: {
      id: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String || null,
        required: false,
      },
    },
    status: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Threads = mongoose.model("Threads", threadSchema);

export default Threads;
