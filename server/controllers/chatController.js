import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE,
  REFRESH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import { deleteFilesFromCloudinary, emitEvents } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

export const newGroupChatController = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  //console.log("name", name);
  //console.log("members", members);

  if (members.length < 2) {
    return next(
      new ErrorHandler("Group chat must have at least 3 members", 400)
    );
  }

  const allMembers = [...members, req.user];

  await chatModel.create({
    name,
    groupChat: true,
    members: allMembers,
    creator: req.user,
  });

  emitEvents(req, ALERT, members, `Welcome To ${name} group `);
  emitEvents(req, REFRESH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group chat created successfully",
  });
});

export const getMyChatsController = TryCatch(async (req, res, next) => {
  const chats = await chatModel
    .find({ members: req.user })
    .populate("members", "name username avatar");

  const transformedChats = chats.map(
    ({ _id, name, groupChat, members, creator }) => {
      const otherMember = getOtherMember(members, req.user);
      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        name: groupChat ? name : otherMember.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
        creator,
      };
    }
  );

  return res.status(200).json({
    success: true,
    transformedChats,
  });
});

export const getMyGroupsController = TryCatch(async (req, res, next) => {
  const chats = await chatModel
    .find({ members: req.user, groupChat: true, creator: req.user })
    .populate("members", "name username avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => {
    return {
      _id,
      name,
      groupChat,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    groups,
  });
});

export const addMemberController = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1) {
    return next(new ErrorHandler("No member to add", 400));
  }

  const chat = await chatModel.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not the creator of this group", 400));
  }

  const existingMembersSet = new Set(
    chat.members.map((member) => member.toString())
  );

  const newMembersToAdd = [];
  const membersAlreadyInGroup = [];

  for (const memberId of members) {
    if (!existingMembersSet.has(memberId.toString())) {
      newMembersToAdd.push(memberId);
    } else {
      membersAlreadyInGroup.push(memberId);
    }
  }

  if (newMembersToAdd.length === 0) {
    return next(new ErrorHandler("All members are already in the group", 400));
  }

  const newMembersDetails = await userModel.find(
    { _id: { $in: newMembersToAdd } },
    "name"
  );

  chat.members.push(...newMembersToAdd);

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Members limit reached", 400));
  }

  await chat.save();

  const newMembersNames = newMembersDetails.map(({ name }) => name).join(", ");

  emitEvents(req, ALERT, chat.members, `New Members Added: ${newMembersNames}`);

  emitEvents(req, REFRESH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
    newMembers: newMembersNames,
    existingMembersSkipped: membersAlreadyInGroup,
  });
});

export const removeMemberController = TryCatch(async (req, res, next) => {
  const { chatId, userId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    chatModel.findById(chatId),
    userModel.findById(userId, "name"),
  ]);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  if (userId === chat.creator.toString()) {
    return next(new ErrorHandler("You can't remove the creator", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not the creator of this group", 400));
  }

  if (chat.members.length <= 3) {
    return next(new ErrorHandler("Group must have at least 3 members", 400));
  }

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvents(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group`
  );

  emitEvents(req, REFRESH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

export const leaveGroupController = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const chat = await chatModel
    .findById(id)
    .populate("members", "name username avatar");

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  const remainingMembers = chat.members.filter(
    (member) => member._id.toString() !== req.user.toString()
  );

  if (remainingMembers.length < 3) {
    return next(new ErrorHandler("Group must have at least 3 members", 400));
  }

  if (chat.creator.toString() === req.user.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);

    const newCreator = remainingMembers[randomElement];

    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    userModel.findById(req.user, "name"),
    chat.save(),
  ]);

  await chat.save();

  emitEvents(req, ALERT, chat.members, `${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: "You have left the group",
  });
});

export const sendAttachmentController = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const files = req.files || [];

  if (files.length < 1) {
    return next(new ErrorHandler("No file attached", 400));
  }

  if (files.length > 5) {
    return next(
      new ErrorHandler("You can't send more than 5 files at a time", 400)
    );
  }

  // Corrected: Use await with each promise
  const [chat, user] = await Promise.all([
    chatModel.findById(chatId),
    userModel.findById(req.user, "name"),
  ]);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //upload files here
  const attachments = [];

  const messageForDB = {
    content: "",
    attachments,
    sender: req.user,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: req.user,
      name: user.name,
    },
  };

  const message = await messageModel.create(messageForDB);

  emitEvents(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvents(req, NEW_MESSAGE, chat.members, { chatId });

  return res.status(201).json({
    success: true,
    message,
  });
});

export const getChatDetailsController = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const { id } = req.params;

    // console.log("run 1");

    const chat = await chatModel
      .findById(id)
      .populate("members", "name username avatar")
      .lean();

    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    chat.members = chat.members.map((member) => {
      return {
        _id: member._id,
        name: member.name,
        avatar: member.avatar.url,
      };
    });

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await chatModel.findById(req.params.id);
    // console.log("run2 ");
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

export const deleteChatDetailsController = TryCatch(async (req, res, next) => {
  const chat = await chatModel.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not the creator of this group", 400));
  }

  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return next(new ErrorHandler("You are not a member of this chat", 400));
  }

  //here we have to delete all the messages of this chat as well as attachments of those messages on cloudinary

  const messagesWithAttachments = await messageModel.find({
    chat: chat._id,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      public_ids.push(public_id);
    });
  });

  await Promise.all([
    //delete Files from Cloudinary
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    messageModel.deleteMany({ chat: chat._id }),
  ]);

  emitEvents(req, REFRESH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

export const renameGroupController = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const chat = await chatModel.findById(id);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  if (!chat.creator || !req.user) {
    return next(new ErrorHandler("Invalid creator or user", 500));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not the creator of this group", 400));
  }

  const { name } = req.body;

  chat.name = name;

  await chat.save();

  emitEvents(req, REFRESH_CHATS, chat.members, `Group name changed to ${name}`);

  return res.status(200).json({
    success: true,
    message: "Chat name updated successfully",
  });
});

export const getMessagesController = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { page = 1 } = req.query;

  // console.log("page", page);

  const resultPerPage = 20;
  const skip = (page - 1) * resultPerPage;

  const [message, totalMessageCount] = await Promise.all([
    messageModel
      .find({ chat: id })
      .populate("sender", "name username avatar")
      .sort("-createdAt")
      .limit(resultPerPage)
      .skip(skip),
    messageModel.countDocuments({ chat: id }),
  ]);
  // console.log(message.length);
  // console.log(totalMessageCount);
  const totalPages = Math.ceil(totalMessageCount / resultPerPage);

  return res.status(200).json({
    success: true,
    message: message.reverse(),
    totalPages,
  });
});
