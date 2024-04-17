import express from "express";
import {
  getMyProfile,
  loginController,
  logoutController,
  registerController,
} from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
///before login
router.post("/login", loginController);
router.post("/register", singleAvatar, registerController);

///user must be logged in
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logoutController);

export default router;
