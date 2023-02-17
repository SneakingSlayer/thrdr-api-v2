import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    log: {
      ip: {
        type: String,
        required: false,
      },
      device: {
        type: Object,
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
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
