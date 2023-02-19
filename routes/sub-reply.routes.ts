import express from "express";

import { SUB_REPLIES_ROUTE } from "../constants/routes";

import {
  getSubReplies,
  createSubReply,
} from "../controllers/sub-reply.controller";

const router = express.Router();

router.post(SUB_REPLIES_ROUTE, createSubReply);
router.get(SUB_REPLIES_ROUTE, getSubReplies);

export default router;
