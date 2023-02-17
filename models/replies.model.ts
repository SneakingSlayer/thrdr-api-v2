import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    threadId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Threads",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Users",
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
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

const Replies = mongoose.model("Replies", replySchema);

export default Replies;
