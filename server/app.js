import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import chatRoute from "./routes/chatRoutes.js";
import { connectDB } from "./utils/features.js";
import adminRoutes from "./routes/adminRoutes.js";
import colors from "colors";
import { Server } from "socket.io";
import { createServer } from "http";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  START_TYPING,
  STOP_TYPING,
} from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import messageModel from "./models/messageModel.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { socketAuth } from "./middlewares/auth.js";
import { createMessage, createMessageInAChat } from "./seeders/userSeeds.js";

export const userSocketId = new Map();
dotenv.config();

cloudinary.config({
  cloud_name: "drtsskg28",
  api_key: "118252269821872",
  api_secret: "JoRta86nrICuXnlwEqGLzcHbe0A",
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://dainty-kheer-833785.netlify.app",
    credentials: true,
  },
});

app.set("io", io);

connectDB();
// createUser(10);
// createSampleChats(10);
// createSingleChats(10);
//createGroupChats(10);
// createMessage(10);
// createMessageInAChat(10, "6623490aa3ad1fa4ca1d3200");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://dainty-kheer-833785.netlify.app",
    credentials: true,
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/admin", adminRoutes);

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuth(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  // console.log("user from socket", user);
  userSocketId.set(user._id.toString(), socket.id);

  console.log("a user connected", userSocketId);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      _id: uuid(),
      content: message,
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);

    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });

    try {
      await messageModel.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on(START_TYPING, ({ chatId, members }) => {
    const membersSocket = getSockets(members);
    console.log("START_TYPING", chatId, members);

    socket.to(membersSocket).emit(START_TYPING, {
      chatId,
      user: {
        _id: user._id,
        name: user.name,
      },
    });
  });

  socket.on(STOP_TYPING, ({ chatId, members }) => {
    const membersSocket = getSockets(members);
    console.log("STOP_TYPING", chatId, members);
    socket.to(membersSocket).emit(STOP_TYPING, {
      chatId,
      user: {
        _id: user._id,
        name: user.name,
      },
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketId.delete(user._id.toString());
  });
});

app.use(errorMiddleware);
server.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
      .bgCyan.black
  );
});
