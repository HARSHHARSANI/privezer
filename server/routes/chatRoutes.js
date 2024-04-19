import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMemberController,
  getMyChatsController,
  getMyGroupsController,
  leaveGroupController,
  newGroupChatController,
  removeMemberController,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/new", isAuthenticated, newGroupChatController);
router.get("/getmychat", isAuthenticated, getMyChatsController);
router.get("/getmygroups", isAuthenticated, getMyGroupsController);
router.put("/addmembers", isAuthenticated, addMemberController);
router.delete("/delete", isAuthenticated, removeMemberController);
router.delete("/leave/:id", isAuthenticated, leaveGroupController);

//send attachment
//get Messages
//Get chat detailes
//delete chat , rename chat , leave chat
//

export default router;
