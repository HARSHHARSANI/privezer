import React, { useCallback } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { Samplechats } from "../constants/SampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../constants/events";
import { incrementNotificationCount } from "../../redux/reducers/chat";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const socket = getSocket();

    const { user } = useSelector((state) => state.auth);

    // console.log("socket.id", socket.id);

    const dispatch = useDispatch();

    const { isMobile } = useSelector((state) => state.misc);

    const { isLoading, data, isError, refetch, error } = useMyChatsQuery("");

    const NewMessagesAlertHandler = useCallback(({ chatId }) => {
      console.log("NewMessagesAlertHandler", chatId);
    }, []);

    const NewRequestHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: NewMessagesAlertHandler,
      [NEW_REQUEST]: NewRequestHandler,
    };

    useSocketEvents(socket, eventHandlers);

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, GroupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, GroupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.transformedChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid container sx={{ height: "calc(100vh - 4rem)" }}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.transformedChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0, 0, 0, 0.85)",
              height: "100%",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
