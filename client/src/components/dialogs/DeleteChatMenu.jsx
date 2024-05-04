import { Menu, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  console.log(selectedDeleteChat);
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };
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
        onClick={() => {
          dispatch(setIsDeleteMenu(false));
        }}
        sx={{
          padding: "0.5rem",
          width: "10rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
      >
        {selectedDeleteChat.GroupChat ? <>Leave Group</> : <> Delete Chat</>}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
