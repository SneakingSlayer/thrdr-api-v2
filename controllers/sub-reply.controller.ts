import { Request, Response } from "express";
import { checkCreator } from "../utils/checkCreator";
import SubReplies from "../models/sub-replies.model";
import Replies from "../models/replies.model";

export const getSubReplies = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.params;
    const subReplies = await SubReplies.find({ replyId: id })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number))
      .sort({ createdAt: -1 });
    const count = await SubReplies.countDocuments({
      replyId: id,
    });
    return res.status(200).json({
      subReplies,
      totalPages: Math.ceil(count / (limit as number)),
      currentPage: parseInt(page as string),
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createSubReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subReply = req.body;
    const findReply = await Replies.find({ _id: id });
    if (!findReply)
      return res.status(404).json({ message: "Reply not found." });
    const findCreatedBy = await checkCreator(subReply.createdBy);
    const newSubReply = new SubReplies({
      ...subReply,
      createdBy: findCreatedBy,
    });
    const result = await newSubReply.save();
    return res.status(200).json({ message: "Sub reply successfully created." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
