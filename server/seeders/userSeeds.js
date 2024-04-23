import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import { faker, simpleFaker } from "@faker-js/faker";

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
      for (let j = i + 1; j < users.length; j++) {
        chatPromises.push(
          chatModel.create({
            name: faker.lorem.word(),
            members: [users[i], users[j]],
            groupChat: false,
          })
        );
      }
    }

    await Promise.all(chatPromises);

    console.log("Single chats created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const createGroupChats = async (numChats) => {
  try {
    const users = await userModel.find({}).select("_id");
    const chatPromises = [];

    for (let i = 0; i < numChats; i++) {
      const chatMembers = [];
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];

      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        //ensure no duplicate members
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const chat = chatModel.create({
        name: faker.lorem.word(),
        members: members,
        groupChat: true,
        creator: members[0],
      });

      chatPromises.push(chat);
    }

    await Promise.all(chatPromises);

    console.log("Group chats created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const createMessage = async (numMessages) => {
  try {
    const users = await userModel.find({}).select("_id");
    const chats = await chatModel.find({}).select("_id");
    const messagePromises = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomChatIndex = Math.floor(Math.random() * chats.length);

      messagePromises.push(
        messageModel.create({
          chat: chats[randomChatIndex],
          sender: users[randomUserIndex],
          content: faker.lorem.sentence(),
          message: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromises);
    console.log("Messages created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const createMessageInAChat = async (numMessages, chatId) => {
  try {
    const users = await userModel.find({}).select("_id");
    const messagePromises = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length);

      messagePromises.push(
        messageModel.create({
          chat: chatId,
          sender: users[randomUserIndex],
          message: faker.lorem.sentence(),
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromises);
    console.log("Messages created successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
