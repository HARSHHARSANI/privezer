import express from "express";
import {
  GetMyFriendsController,
  GetMyNotificationController,
  acceptRequestController,
  getMyProfile,
  loginController,
  logoutController,
  registerController,
  searchUserController,
  sendRequestController,
} from "../controllers/userController.js";
import {
  acceptRequestValidators,
  loginValidators,
  registerValidators,
  searchUserValidators,
  sendRequestValidators,
  validateHandler,
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
router.post(
  "/searchuser",
  isAuthenticated,
  searchUserValidators(),
  validateHandler,
  searchUserController
);
router.put(
  "/sendrequest",
  isAuthenticated,
  sendRequestValidators(),
  validateHandler,
  sendRequestController
);

router.get(
  "/acceptrequest",
  isAuthenticated,
  acceptRequestValidators(),
  validateHandler,
  acceptRequestController
);

router.get("/notification", isAuthenticated, GetMyNotificationController);

router.get("/friends" , isAuthenticated, GetMyFriendsController)

export default router;
