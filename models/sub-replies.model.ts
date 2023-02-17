import mongoose from "mongoose";

const subReplySchema = new mongoose.Schema(
  {
    replyId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Replies",
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

const SubReplies = mongoose.model("SubReplies", subReplySchema);

export default SubReplies;
