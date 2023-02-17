import express from "express";
import { AUTH_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/routes";

import { signIn, signUp } from "../controllers/auth.controller";

const router = express.Router();

router.get(AUTH_ROUTE, () => {});
router.post(LOGIN_ROUTE, signIn);
router.post(REGISTER_ROUTE, signUp);

export default router;
