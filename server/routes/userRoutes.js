import express from "express";
import {
  getMyProfile,
  loginController,
  logoutController,
  registerController,
  searchUserController,
} from "../controllers/userController.js";
import {
  loginValidators,
  registerValidators,
  validateHandler
} from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

// Function to dynamically run registerValidators middleware

const router = express.Router();
///before login
router.post("/login", loginValidators(), validateHandler, loginController);

router.post(
  "/register",
  singleAvatar,
  registerValidators(),
  validateHandler,
  registerController
);

///user must be logged in
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logoutController);
router.post("/searchuser", isAuthenticated, searchUserController);

export default router;
