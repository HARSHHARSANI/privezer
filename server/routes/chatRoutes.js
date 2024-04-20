import express from "express";

import {
  addMemberController,
  deleteChatDetailsController,
  getChatDetailsController,
  getMessagesController,
  getMyChatsController,
  getMyGroupsController,
  leaveGroupController,
  newGroupChatController,
  removeMemberController,
  renameGroupController,
  sendAttachmentController,
} from "../controllers/chatController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = express.Router();

router.get("/new", isAuthenticated, newGroupChatController);
router.get("/getmychat", isAuthenticated, getMyChatsController);
router.get("/getmygroups", isAuthenticated, getMyGroupsController);
router.put("/addmembers", isAuthenticated, addMemberController);
router.delete("/delete", isAuthenticated, removeMemberController);
router.delete("/leave/:id", isAuthenticated, leaveGroupController);

//send attachment
router.post(
  "/message",
  isAuthenticated,
  attachmentsMulter,
  sendAttachmentController
);

//get Messages

router.get("/messages/:id", isAuthenticated, getMessagesController);

//Get chat detailes ,delete chat , rename chat
router.get("/chat/:id", isAuthenticated, getChatDetailsController);
router.delete("/chat/:id", isAuthenticated, deleteChatDetailsController);
router.put("/chat/:id", isAuthenticated, renameGroupController);

export default router;
