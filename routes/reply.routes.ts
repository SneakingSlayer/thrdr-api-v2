import express from "express";

import { REPLY_ROUTE, REPLIES_ROUTE } from "../constants/routes";
import { createReply, getReplies } from "../controllers/reply.controller";

const router = express.Router();

router.post(REPLY_ROUTE, createReply);
router.get(REPLIES_ROUTE, getReplies);

export default router;
