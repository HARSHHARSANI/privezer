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
import {
  addMemberValidators,
  deleteChatDetailsValidators,
  getChatDetailsValidators,
  getMessageValidators,
  groupChatValidators,
  leaveGroupValidators,
  removeMemberValidators,
  renameGroupValidators,
  sendAttachmentValidators,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.post(
  "/new",
  isAuthenticated,
  groupChatValidators(),
  validateHandler,
  newGroupChatController
);

router.get("/getmychat", isAuthenticated, getMyChatsController);

router.get("/getmygroups", isAuthenticated, getMyGroupsController);

router.put(
  "/addmembers",
  isAuthenticated,
  addMemberValidators(),
  validateHandler,
  addMemberController
);
router.delete(
  "/delete",
  isAuthenticated,
  removeMemberValidators(),
  validateHandler,
  removeMemberController
);
router.delete(
  "/leave/:id",
  isAuthenticated,
  leaveGroupValidators(),
  validateHandler,
  leaveGroupController
);

//send attachment
router.post(
  "/message",
  isAuthenticated,
  attachmentsMulter,
  sendAttachmentValidators(),
  validateHandler,
  sendAttachmentController
);

//get Messages
router.get(
  "/messages/:id",
  isAuthenticated,
  getMessageValidators(),
  validateHandler,
  getMessagesController
);

//Get chat detailes ,delete chat , rename chat
router.get(
  "/chat/:id",
  isAuthenticated,
  getChatDetailsValidators(),
  validateHandler,
  getChatDetailsController
);
router.delete(
  "/chat/:id",
  isAuthenticated,
  deleteChatDetailsValidators(),
  validateHandler,
  deleteChatDetailsController
);
router.put(
  "/chat/:id",
  isAuthenticated,
  renameGroupValidators(),
  validateHandler,
  renameGroupController
);

export default router;
