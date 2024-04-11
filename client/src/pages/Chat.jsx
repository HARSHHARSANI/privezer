import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton } from "@mui/material";
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

const Chat = () => {
  const containerRef = useRef(null);

  const user = {
    id: "1",
    name: "John Doe",
  };
  return (
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
          <InputBox placeholder="Type Message here ..." />
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
