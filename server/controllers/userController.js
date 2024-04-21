import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { emitEvents, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";
import { cookieOptions } from "../utils/features.js";
import chatModel from "../models/chatModel.js";
import requestModel from "../models/requestModel.js";
import { New_REQUEST, REFRESH_CHATS } from "../constants/events.js";

export const registerController = async (req, res) => {
  try {
    const { name, username, bio, password } = req.body;

    const avatar = {
      public_id: "123456",
      url: "https://res.cloudinary.com/dx3w3v7g1/image/upload/v1630986827/avatars/123456.jpg",
    };

    if (!name || !username || !bio || !password || !avatar) {
      return res
        .status(400)
        .json({ message: "All fields are required from registerController" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    ///check if the user exist
    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await userModel.create({
      name,
      username,
      bio,
      password: hashedPassword,
      avatar,
    });

    const result = await sendToken(
      user,
      "User registered successfully",
      201,
      res
    );
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // console.log("username --->", username, "password --->", password);
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
      return next(new ErrorHandler("Invalid credentials 1 ", 400));
    }
    ///compare the password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return next(new ErrorHandler("Invalid credentials 2", 400));
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

  emitEvents(req.user, New_REQUEST, [id]);

  res.status(200).json({
    success: true,
    message: "Request sent successfully",
    request,
  });
});

export const acceptRequestController = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  // console.log(requestId, accept);

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
  // console.log(req.user);

  const requests = await requestModel
    .find({ receiver: req.user })
    .populate("sender", "name username avatar");

  // console.log("requests", requests);

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

  res.status(200).json({
    success: true,
    allRequests,
  });
});

export const GetMyFriendsController = TryCatch(async (req, res, next) => {
  // console.log(req.user);
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

  res.status(200).json({
    success: true,
    allFriends,
    count: allFriends.length,
  });
});
