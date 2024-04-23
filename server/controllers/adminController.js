import { TryCatch } from "../middlewares/error.js";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/features.js";

export const adminLogin = TryCatch(async (req, res) => {
  const { secretKey } = req.body;
  if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({
      status: "error",
      message: "Invalid Secret Key",
    });
  }

  const token = jwt.sign({ secretKey }, process.env.JWT_SECRET, {
    expiresIn: 60 * 15,
  });

  return res
    .status(200)
    .cookie("privazer-admin-token", token, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      status: "success",
      data: "Admin Authenticated Successfully",
    });
});

export const adminLogout = TryCatch(async (req, res) => {
  return res.status(200).clearCookie("privazer-admin-token").json({
    status: "success",
    data: "Admin Logged Out Successfully",
  });
});

export const getAllUsers = TryCatch(async (req, res) => {
  const allUsers = await userModel.find({});

  const Users = await Promise.all(
    allUsers.map(async ({ name, username, avatar, _id, createdAt }) => {
      const [groupsCount, friendsCount] = await Promise.all([
        chatModel.countDocuments({ groupChat: true, members: { $in: [_id] } }),
        chatModel.countDocuments({ groupChat: false, members: { $in: [_id] } }),
      ]);
      return {
        _id,
        name,
        username,
        avatar: avatar.url,
        createdAt,
        friends: friendsCount,
        groups: groupsCount,
      };
    })
  );

  res.status(200).json({
    status: "success",
    data: Users,
  });
});

export const getAllChats = TryCatch(async (req, res) => {
  const chats = await chatModel
    .find({})
    .populate("members", "name username avatar")
    .populate("creator");

  const AllChats = await Promise.all(
    chats.map(async ({ _id, name, groupChat, members, creator }) => {
      const membersLength = members.length;

      const membersArray = members.map(({ name, username, avatar, _id }) => {
        return {
          _id,
          name,
          username,
          avatar: avatar?.url,
          membersLength: membersLength,
        };
      });

      const totalMessages = await messageModel.countDocuments({ chat: _id });

      return {
        _id,
        name,
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url,
        },
        groupChat,
        avatar: members?.slice(0, 3).map((member) => member.avatar.url),
        members: membersArray,
        totalMessages,
      };
    })
  );

  res.status(200).json({
    status: "success",
    AllChats,
    count: AllChats.length,
  });
});

export const getAllMessages = TryCatch(async (req, res) => {
  const messages = await messageModel
    .find({})
    .populate("sender", "name username avatar")
    .populate("chat");

  const transformedMessages = await Promise.all(
    messages.map(
      async ({
        _id,
        chat,
        sender,
        message,
        createdAt,
        content,
        attachment,
      }) => {
        return {
          _id,
          attachment,
          chat: chat._id,
          content,
          sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
          },
          message,
          createdAt,
          groupChat: chat.groupChat,
        };
      }
    )
  );

  res.status(200).json({
    status: "success",
    messages,
    count: messages.length,
  });
});

export const getDashboardStats = TryCatch(async (req, res) => {
  const totalUsers = await userModel.countDocuments({});
  const totalChats = await chatModel.countDocuments({});
  const totalMessages = await messageModel.countDocuments({});
  const SingleChat = await chatModel.countDocuments({ groupChat: false });
  const GroupChat = await chatModel.countDocuments({ groupChat: true });

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7DaysMessages = await messageModel
    .find({
      createdAt: { $gte: last7Days, $lt: today },
    })
    .select("createdAt");

  const messages = new Array(7).fill(0);

  last7DaysMessages.forEach(({ createdAt }) => {
    const day = (today.getDate() - createdAt.getDate()) % 7;
    messages[day] += 1;
  });

  const stats = {
    totalUsers,
    totalChats,
    totalMessages,
    SingleChat,
    GroupChat,
    last7DaysMessages,
    messages: messages.reverse(),
  };

  res.status(200).json({
    status: "success",
    stats,
  });
});

export const getAdminData = TryCatch(async (req, res) => {
  const totalUsers = await userModel.countDocuments({});
  const totalChats = await chatModel.countDocuments({});
  const totalMessages = await messageModel.countDocuments({});

  res.status(200).json({
    status: "success",
    data: {
      totalUsers,
      totalChats,
      totalMessages,
    },
  });
});
