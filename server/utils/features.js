import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const cookieOptions = {
  maxAge: 2 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export const sendToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res
    .status(statusCode)
    .cookie("privazer-token ", token, cookieOptions)
    .json({
      success: true,
      message,
    });
};
