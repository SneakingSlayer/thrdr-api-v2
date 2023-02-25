import { Request, Response } from "express";
import Threads from "../models/threads.model";
import { checkCreator } from "../utils/checkCreator";

export const getThreads = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.params;
    const threads = await Threads.find({
      "createdFor.userName": id,
    })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number))
      .sort({ createdAt: -1 });
    const count = await Threads.countDocuments({
      "createdFor.userName": id,
    });
    return res.status(200).json({
      threads,
      totalPages: Math.ceil(count / (limit as number)),
      currentPage: parseInt(page as string),
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await Threads.findOne({ _id: id });
    return res.status(200).json(thread);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createThread = async (req: Request, res: Response) => {
  try {
    const thread = req.body;
    const findCreatedBy = await checkCreator(thread.createdBy);
    const findCreatedFor = await checkCreator(thread.createdFor);
    const newThread = new Threads({
      ...thread,
      createdBy: findCreatedBy,
      createdFor: findCreatedFor,
    });
    const result = await newThread.save();
    res.status(200).json({ message: "Thread successfully created." });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
