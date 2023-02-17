import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
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
    replyCount: {
      type: Number,
      required: true,
    },
    viewCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Threads = mongoose.model("Threads", threadSchema);

export default Threads;
