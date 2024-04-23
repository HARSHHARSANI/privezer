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
    console.log(`MongoDB Connected: ${conn.connection.host}.`.bgMagenta);
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

export const emitEvents = (req, event, users, data) => {
  console.log("emitting event", event);
};

export const deleteFilesFromCloudinary = async (public_ids) => {
  try {
    // const result = await cloudinary.api.delete_resources(public_ids);
    // console.log(result);
    console.log("inside deleteFilesFromCloudinary");
  } catch (error) {
    console.error(error);
  }
};
