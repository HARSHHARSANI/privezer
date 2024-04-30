import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { NEW_REQUEST, REFRESH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import chatModel from "../models/chatModel.js";
import requestModel from "../models/requestModel.js";
import userModel from "../models/userModel.js";
import {
  cookieOptions,
  emitEvents,
  sendToken,
  uploadFiles,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

cloudinary.config({
  cloud_name: "drtsskg28",
  api_key: "118252269821872",
  api_secret: "JoRta86nrICuXnlwEqGLzcHbe0A",
});

export const registerController = TryCatch(async (req, res) => {
  try {
    const { name, username, bio, password } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    console.log(name, username, bio, password);
    console.log("file", file);

    const result = await uploadFiles([file]);

    const avatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    };

    // Check if the user exists
    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    // Save user details including Cloudinary public ID and URL
    const user = await userModel.create({
      name,
      username,
      bio,
      password: hashedPassword,
      avatar,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log("username --->", username, "password --->", password);
    ///check input fields
    if (!username || !password) {
      return next(
        new ErrorHandler("Please provide username and password", 400)
      );
    }
    ///find the user in the db
    const user = await userModel
      .findOne({ username: username })
      .select("+password");

    // console.log(user);

    if (!user) {
      return next(new ErrorHandler("Invalid credentials ", 400));
    }
    ///compare the password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }

    sendToken(user, `Welcome Back ${user.name}`, 200, res);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = TryCatch(async (req, res, next) => {
  const userFound = await userModel.findById(req.user);

  if (!userFound) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    userFound,
  });
});

export const logoutController = TryCatch(async (req, res, next) => {
  res.cookie("privazer-token", "none", { ...cookieOptions, maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const searchUserController = TryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  const myChats = await chatModel.find({
    groupChat: false,
    members: { $in: [req.user] },
  });

  //All Users from My Chats means Friends
  const allUserFromMyChatsExceptMe = myChats.flatMap((chat) => {
    return chat.members.filter((member) => member != req.user);
  });

  /// Find Users except me and my friends
  const allUsersExceptMeAndMyFriends = await userModel.find({
    _id: { $nin: allUserFromMyChatsExceptMe },
    name: { $regex: name, $options: "i" },
  });

  ///map the users for the frontend
  const users = allUsersExceptMeAndMyFriends.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar.url,
    };
  });

  res.status(200).json({
    success: true,
    users,
  });
});

export const sendRequestController = TryCatch(async (req, res, next) => {
  const { id } = req.body;

  console.log("id in sendRequestController", id);

  ///check if the request is already sent
  const requestExist = await requestModel.findOne({
    $or: [
      { sender: req.user, receiver: id },
      { sender: id, receiver: req.user },
    ],
  });

  if (requestExist) {
    return next(new ErrorHandler("Request already sent", 400));
  }

  const request = await requestModel.create({
    sender: req.user,
    receiver: id,
  });

  await request.save();

  emitEvents(req, NEW_REQUEST, [id]);

  res.status(200).json({
    success: true,
    message: "Request sent successfully",
    request,
  });
});

export const acceptRequestController = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  console.log("requestId, accept", requestId, accept);

  const request = await requestModel
    .findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  // console.log(request);

  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }

  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You Are Unauthorized To Accept This Request", 401)
    );
  }

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Request Declined ",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    chatModel.create({
      members,
      name: `${request.sender.name} - ${request.receiver.name}`,
      groupChat: false,
    }),
    request.deleteOne(),
  ]);

  emitEvents(req.user, REFRESH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Request Accepted",
    senderId: request.sender._id,
  });
});

export const GetMyNotificationController = TryCatch(async (req, res, next) => {
  const requests = await requestModel
    .find({ receiver: req.user })
    .populate("sender", "name username avatar");

  const allRequests = requests.map(({ _id, sender }) => {
    return {
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        username: sender.username,
        avatar: sender.avatar.url,
      },
    };
  });

  console.log(allRequests);

  res.status(200).json({
    success: true,
    allRequests,
  });
});

export const GetMyFriendsController = TryCatch(async (req, res, next) => {
  // console.log(req.user);
  const { chatId } = req.query;

  const myChats = await chatModel.find({
    groupChat: false,
    members: { $in: [req.user] },
  });

  const allUserFromMyChatsExceptMe = myChats.flatMap((chat) => {
    return chat.members.filter((member) => member != req.user);
  });

  const friends = await userModel.find({
    _id: { $in: allUserFromMyChatsExceptMe },
  });

  const allFriends = friends.map((friend) => {
    return {
      _id: friend._id,
      name: friend.name,
      username: friend.username,
      avatar: friend.avatar.url,
    };
  });

  if (chatId) {
    const chat = await chatModel.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    const allAvailableFriends = availableFriends.map((friend) => {
      return {
        _id: friend._id,
        name: friend.name,
        username: friend.username,
        avatar: friend.avatar.url,
      };
    });

    return res.status(200).json({
      success: true,
      allAvailableFriends,
      count: allAvailableFriends.length,
    });
  }

  res.status(200).json({
    success: true,
    allFriends,
    count: allFriends.length,
  });
});
