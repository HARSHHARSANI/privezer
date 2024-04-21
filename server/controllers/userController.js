import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";
import { cookieOptions } from "../utils/features.js";

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
    ///check input fields
    if (!username || !password) {
      return next(
        new ErrorHandler("Please provide username and password", 400)
      );
    }
    ///find the user in the db
    const user = await userModel.findOne({ username }).select("+password");

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
  const { name } = req.query;
  const users = await userModel.find({
    name: { $regex: name, $options: "i" },
  });

  if (!users) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    users,
  });
});
