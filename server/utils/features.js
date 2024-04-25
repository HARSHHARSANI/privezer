import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";

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

  // Create a new object without the password field using object destructuring
  const sanitizedUser = { ...user._doc };
  delete sanitizedUser.password;

  return res
    .status(statusCode)
    .cookie("privazer-token", token, cookieOptions)
    .json({
      success: true,
      message,
      user: sanitizedUser, // Send the sanitized user object without the password
    });
};

export const emitEvents = (req, event, users, data) => {
  console.log("emitting event", event);
};

export const uploadFiles = async (files = []) => {
  const uploadPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromise);

    const formattedResult = results.map((result) => {
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });
    return formattedResult;
  } catch (error) {
    throw new Error("error uploading files to cloudinary ", error);
  }
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
