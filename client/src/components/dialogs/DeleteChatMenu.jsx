import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  DeleteForeverOutlined as DeleteForeverOutlinedIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { userAsyncMutation } from "../hooks/hook";
import {
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const navigate = useNavigate();

  const [deleteChat, isloadingDeleteGroup, deleteGroupData] = userAsyncMutation(
    useDeleteGroupMutation
  );

  const [leaveGroup, isloadingLeaveGroup, LeaveGroupData] = userAsyncMutation(
    useLeaveGroupMutation
  );

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const LeaveGroupHandler = () => {
    closeHandler();
    console.log("Leave Group");
    leaveGroup("Leaving Group ...", selectedDeleteChat.chatId);
  };

  const deleteChatHandler = () => {
    closeHandler();
    console.log("Delete Group");
    deleteChat("Deleting Group ...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteGroupData || LeaveGroupData) {
      navigate("/");
    }
  }, [deleteGroupData, LeaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          padding: "0.5rem",
          width: "10rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={() => {
          selectedDeleteChat.GroupChat
            ? LeaveGroupHandler()
            : deleteChatHandler();
        }}
      >
        {selectedDeleteChat.GroupChat ? (
          <>
            <ExitToAppIcon /> <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            {" "}
            <DeleteForeverOutlinedIcon /> <Typography>Delete Chat</Typography>
          </>
        )}

        {isloadingDeleteGroup || isloadingLeaveGroup ? (
          <Typography>Loading ...</Typography>
        ) : null}

        {deleteGroupData || LeaveGroupData ? (
          <Typography>Success</Typography>
        ) : null}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
