import express from "express";

import { REPLY_ROUTE, REPLIES_ROUTE } from "../constants/routes";

const router = express.Router();

router.get(REPLY_ROUTE, () => {});
router.get(REPLIES_ROUTE, () => {});

export default router;
