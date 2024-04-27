import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";
import { transformImage } from "../../lib/features";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack spacing={2} direction="column" alignItems="center">
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "fill",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading="Bio" text={user?.bio} />

      <ProfileCard
        heading="Username"
        text={user?.username}
        Icon={<UsernameIcon />}
      />

      <ProfileCard heading="Name" text={user?.name} Icon={<FaceIcon />} />

      <ProfileCard
        heading="Joined"
        text={moment(user?.createdAt).fromNow()}
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
