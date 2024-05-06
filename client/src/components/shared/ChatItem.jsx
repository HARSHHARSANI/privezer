import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Stack, Typography, Box } from "@mui/material";
import Avatar from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat,
  sameSender,
  isOnline,
  newMessageAlert = [],
  index,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      {/* Ensure the motion.div is properly rendered */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }} // Simplified animation logic
        transition={{ delay: index * 0.1 }}
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <Avatar avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
          {/* Ensure newMessageAlert is an object */}
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {/* Ensure isOnline is a boolean */}
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
