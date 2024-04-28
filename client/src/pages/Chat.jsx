import React, { useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton, Skeleton } from "@mui/material";
import {
  errorColor,
  grayColor,
  infoColor,
  lightGray,
  orange,
  primaryColor,
  secondaryColor,
} from "../components/constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendFileIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../components/constants/SampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../components/constants/events";
import { useChatDetailsQuery } from "../redux/api/api";

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);

  const socket = getSocket();

  const [message, setMessage] = useState("");

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  // console.log("chatDetails.data", chatDetails.data.chat.members);

  const user = {
    id: "1",
    name: "John Doe",
  };

  // console.log(members, "members");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, {
      chatId,
      members: chatDetails?.data?.chat?.members,
      message,
    });

    setMessage("");

    // containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        sx={{
          height: "90%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {sampleMessage.map((message, index) => (
          <MessageComponent message={message} user={user} key={message._id} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          alignItems={"center"}
          padding={"1rem"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              padding: "0.5rem",

              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message here ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              bgcolor: secondaryColor,
              rotate: "-20deg",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendFileIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
