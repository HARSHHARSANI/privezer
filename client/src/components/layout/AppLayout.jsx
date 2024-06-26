import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrSaveFromStorage } from "../../lib/features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFRESH_CHATS,
} from "../constants/events";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import { useErrors, useSocketEvents } from "../hooks/hook";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const deleteOptionAnchor = useRef(null);
    const navigate = useNavigate();

    const socket = getSocket();

    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const { isMobile } = useSelector((state) => state.misc);

    const { isLoading, data, isError, refetch, error } = useMyChatsQuery("");

    // console.log(refetch);

    const NewMessagesAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const NewRequestListener = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: NewMessagesAlertListener,
      [NEW_REQUEST]: NewRequestListener,
      [REFRESH_CHATS]: refetchListener,
    };

    useSocketEvents(socket, eventHandlers);

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, chatId, GroupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, GroupChat }));
      deleteOptionAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
      refetch();
    }, [newMessagesAlert]);

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteOptionAnchor.current}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.transformedChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
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
                newMessagesAlert={newMessagesAlert}
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
