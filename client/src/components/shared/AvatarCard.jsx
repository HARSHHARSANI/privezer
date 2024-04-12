import React from "react";
import { Stack, Box, Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <Avatar
        max={max}
        height={"3rem"}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"}>
          {Array.isArray(avatar) &&
            avatar?.map((i, index) => (
              <img
                src={transformImage(i)}
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
