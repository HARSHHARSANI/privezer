import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    (
      <Stack width={w} direction={"column"}>
        {chats.map((data, index) => {
          const { avatar, name, _id, GroupChat, members } = data;
          const newMessageAlert = newMessagesAlert?.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );


          return (
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              GroupChat={GroupChat}
              key={_id}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
      </Stack>
    )
  );
};

export default ChatList;
