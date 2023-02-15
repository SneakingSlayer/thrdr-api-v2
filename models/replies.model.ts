import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
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
