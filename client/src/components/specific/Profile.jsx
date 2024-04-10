import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={2} direction="column" alignItems="center">
      <Avatar
        src="https://example.com/your-avatar.jpg"
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading="Bio" text="asdasd sdasd" />

      <ProfileCard
        heading="Username"
        text="harshharsani"
        Icon={<UsernameIcon />}
      />

      <ProfileCard heading="Name" text="Harsh Harsani" Icon={<FaceIcon />} />

      <ProfileCard
        heading="Joined"
        text={moment("2023-11-04T18:30:00.000Z").fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ heading, text, Icon }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    color="white"
    textAlign="center"
  >
    {Icon && Icon}

    <Stack direction="column" alignItems="center">
      <Typography variant="body1">{text}</Typography>
      <Typography color="gray">{heading}</Typography>
    </Stack>
  </Stack>
);

export default Profile;
