import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { PRIVAZER_TOKEN } from "../config.js";
import userModel from "../models/userModel.js";

export const isAuthenticated = TryCatch((req, res, next) => {
  //   console.log("req.cookies", req.cookies["privazer-token"]);
  const token = req.cookies[PRIVAZER_TOKEN];

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  //verify the token
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData.id;
  // console.log("req.user", req.user);
  // console.log(decodedData);
  next();
});
// Compare this snippet from server/utils/error.js:

export const AdminOnly = TryCatch(async (req, res, next) => {
  const token = req.cookies["privazer-admin-token"];
  if (!token) {
    return next(new ErrorHandler("Only Admin Can access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);
  if (decodedData.secretKey !== process.env.ADMIN_SECRET_KEY) {
    return next(
      new ErrorHandler("You are not authorized to access this route", 401)
    );
  }
  next();
});

export const socketAuth = async (err, socket, next) => {
  try {
    console.log("inside socket auth");

    if (err) return next(err);

    const authToken = socket.request.cookies["privazer-token"]; // Correctly assign authToken

    // console.log(socket.request.cookies);

    // console.log(authToken, "authToken");

    if (!authToken) {
      return next(
        new ErrorHandler("Please login to access this resource 1", 401)
      );
    }

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    // console.log(decodedData, "decodedData");

    const user = await userModel.findById(decodedData.id);

    if (!user) {
      return next(
        new ErrorHandler("Please login to access this resource 2", 401)
      );
    }

    socket.user = user;

    // console.log(socket.user);

    return next();
  } catch (error) {
    console.log(error);
    return next(
      new ErrorHandler("Please login to access this resource 3", 401)
    );
  }
};
