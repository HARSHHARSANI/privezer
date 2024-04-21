import express from "express";
import userRoutes from "./routes/userRoutes.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import chatRoute from "./routes/chatRoutes.js";
import { connectDB } from "./utils/features.js";
import {
  createGroupChats,
  createMessage,
  createMessageInAChat,
  createSingleChats,
} from "./seeders/userSeeds.js";

dotenv.config();

const app = express();

connectDB();
//createUser(10);
// createSampleChats(10);
//createSingleChats(10);
//createGroupChats(10);
//  createMessage(10);
//createMessageInAChat(10, "6623490aa3ad1fa4ca1d3200");

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/chats", chatRoute);

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
