import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendFileIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { grayColor, secondaryColor } from "../components/constants/color";
import { NEW_MESSAGE } from "../components/constants/events";
import FileMenu from "../components/dialogs/FileMenu";
import { useErrors, useSocketEvents } from "../components/hooks/hook";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponent";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const disptach = useDispatch();

  const socket = getSocket();

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page: page });

  // console.log("chatDetails.data", chatDetails.data.chat.members);

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

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  // console.log(oldMessages, "oldMessages");
  // console.log(page, "page");

  const NewMessagesHandler = useCallback((data) => {
    console.log("NewMessagesHandler", data);
    setMessages((prev) => [...prev, data]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: NewMessagesHandler };

  useSocketEvents(socket, eventHandler);

  useErrors([{ isError: chatDetails.isError, error: chatDetails.error }]);
  useErrors([
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ]);

  // console.log(oldMessagesChunk.data, "oldMessagesChunk.data");

  const allMessages = [...oldMessages, ...messages];

  const handleFileOpen = (e) => {
    disptach(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
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
        {allMessages.map((message) => (
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
            onClick={handleFileOpen}
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
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
