import React from "react";
import { Stack, Box, Avatar } from "@mui/material";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <Avatar max={max} height={"3rem"}>
        <Box width={"5rem"}>
          {Array.isArray(avatar) &&
            avatar?.map((i, index) => (
              <img
                src={i}
                key={index}
                alt={`Avatar ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ))}
        </Box>
      </Avatar>
    </Stack>
  );
};

export default AvatarCard;
