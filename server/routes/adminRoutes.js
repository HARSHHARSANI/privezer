import express from "express";
import { AdminOnly, isAuthenticated } from "../middlewares/auth.js";
import {
  adminLogin,
  adminLogout,
  getAdminData,
  getAllChats,
  getAllMessages,
  getAllUsers,
  getDashboardStats,
} from "../controllers/adminController.js";
import { adminLoginValidators, validateHandler } from "../lib/validators.js";

const router = express.Router();

router.post("/verify", adminLoginValidators(), validateHandler, adminLogin);
router.get("/logout", isAuthenticated, adminLogout);

///only admin can access the following routes

router.use(AdminOnly);
router.get("/", getAdminData);
router.get("/users", isAuthenticated, getAllUsers);
router.get("/chats", isAuthenticated, getAllChats);
router.get("/messages", isAuthenticated, getAllMessages);
router.get("/stats", isAuthenticated, getDashboardStats);
router.get("/logout");

export default router;
