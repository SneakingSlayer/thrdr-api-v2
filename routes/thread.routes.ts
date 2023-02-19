import express from "express";

import { THREAD_ROUTE, THREADS_ROUTE } from "../constants/routes";

import {
  getThread,
  getThreads,
  createThread,
} from "../controllers/thread.controller";

const router = express.Router();

router.get(THREAD_ROUTE, getThread);
router.get(THREADS_ROUTE, getThreads);
router.post(THREADS_ROUTE, createThread);

export default router;
