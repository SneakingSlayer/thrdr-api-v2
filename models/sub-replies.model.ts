import mongoose from "mongoose";

const subReplySchema = new mongoose.Schema(
  {
    replyId: {
      type: mongoose.Types.ObjectId,
      required: true,
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
