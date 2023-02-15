import mongoose from "mongoose";

const subReplySchema = new mongoose.Schema(
  {
    replyId: {
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

const SubReplies = mongoose.model("SubReplies", subReplySchema);

export default SubReplies;
