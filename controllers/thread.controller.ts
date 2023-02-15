import { NextFunction, Request, Response } from "express";
import Threads from "../models/threads.model";

export const getThreads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const threads = await Threads.find({ ...req.query })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number))
      .sort({ createdAt: -1 });

    return res.status(200).send(threads);
  } catch (error) {
    next(error);
  }
};

export const getThread = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const thread = await Threads.findOne({ _id: id });
    res.status(200).send(thread);
  } catch (error) {
    res.status(400).send("There was a problem with your request");
  }
};

export const createThread = async (req: Request, res: Response) => {
  const thread = req.body;
  try {
    const newThread = new Threads(thread);
    const result = await newThread.save();
    res.status(400).send("Thread successfully created.");
  } catch (error) {
    res.status(400).send("There was a problem with your request");
  }
};
