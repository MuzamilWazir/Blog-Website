import express from "express";

const router = express.Router();

import {
  RegisterUser,
  LoginUser,
  refreshToken,
  LogoutUser,
} from "../controller/user.controller.js";

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.post("/refresh-token", refreshToken);
router.post("/logout", LogoutUser);

export default router;
