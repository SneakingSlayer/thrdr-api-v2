import { Request, Response } from "express";
import Replies from "../models/replies.model";
import Threads from "../models/threads.model";
import { checkCreator } from "../utils/checkCreator";

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.params;
    const replies = await Replies.find({ threadId: id })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number))
      .sort({ createdAt: -1 });
    const count = await Threads.countDocuments({
      threadId: id,
    });
    return res.status(200).json({
      replies,
      totalPages: Math.ceil(count / (limit as number)),
      currentPage: parseInt(page as string),
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reply = req.body;
    const findThread = await Threads.findOne({ _id: id });
    const findCreatedBy = await checkCreator(reply.createdBy);
    if (!findThread)
      return res.status(404).json({ message: "Thread not found." });
    const newReply = new Replies({
      ...reply,
      createdBy: findCreatedBy,
    });
    const result = await newReply.save();
    return res.status(200).json({ message: "Reply successfully created." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
