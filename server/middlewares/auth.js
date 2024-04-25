import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = TryCatch((req, res, next) => {
  //   console.log("req.cookies", req.cookies["privazer-token"]);
  const token = req.cookies["privazer-token"];

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
