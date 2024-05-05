import {
  Add as AddIcon,
  AdminPanelSettingsTwoTone as AdminPanelSettingsTwoToneIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../../lib/features";
import { useAsyncMutation } from "../hooks/hook";
import { useMakeGroupAdminMutation } from "../../redux/api/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  // const navigate = useNavigate();

  // const chatId = useSearchParams()[0].get("group");
  // // const { selectedDeleteChat } = useSelector((state) => state.misc);

  // console.log(chatId);

  // const [makeAdmin, isloadingMakingAdmin, makingAdminData] = useAsyncMutation(
  //   useMakeGroupAdminMutation
  // );

  // const makeAdminHandler = async (_id) => {
  //   makeAdmin("Making Admin ...", { chatId, userId: _id });
  //   navigate("/");
  // };

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          color="initial"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>
        <IconButton
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.main" : "primary.main",
            },
          }}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>

        {/* <IconButton
          onClick={() => makeAdminHandler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.main" : "primary.main",
            },
          }}
        >
          {isAdded ? <AdminPanelSettingsTwoToneIcon /> : null}
        </IconButton> */}
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
