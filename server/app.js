import express from "express";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import chatRoute from "./routes/chatRoutes.js";
import { createUser } from "./seeders/userSeeds.js";

dotenv.config();

const app = express();

connectDB();
//createUser(10);

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/chats", chatRoute);

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
