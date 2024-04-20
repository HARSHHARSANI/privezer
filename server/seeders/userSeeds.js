import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";
import { faker } from "@faker-js/faker";

export const createUser = async (numUsers) => {
  try {
    const userPromises = [];
    for (let i = 0; i < numUsers; i++) {
      const tempUser = userModel.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      userPromises.push(tempUser);
    }

    await Promise.all(userPromises);
    console.log("Users created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const createSingleChats = async (chatsCount) => {
  try {
    const users = await userModel.find({}).select("_id");
    const chatPromises = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < chatsCount; j++) {
        const tempChat = chatModel.create({
          name: faker.lorem.word(),
          creator: users[i]._id,
          members: [users[i], users[j]],
        });
        chatPromises.push(tempChat);
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const createGroupChats = async (chatsCount) => {
  try {
    const users = await userModel.find({}).select("_id");
    const chatPromises = [];

    for (let i = 0; i < chatsCount; i++) {
      const tempChat = chatModel.create({
        name: faker.lorem.word(),
        creator: users[i]._id,
        members: users,
        groupChat: true,
      });
      chatPromises.push(tempChat);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
