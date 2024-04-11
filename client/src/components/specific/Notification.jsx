import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { SampleNotifications } from "../constants/SampleData";

const Notification = () => {
  const friendRequestHandler = ({ _id, accept }) => {
    console.log("friendRequestHandler");
  };

  const NotificationItem = memo(({ sender, _id, handler }) => {
    const { name, avatar } = sender;
    return (
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={avatar} />
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
            {`${name} has sent you a friend request`}
          </Typography>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={"1rem"}
          >
            <Button onClick={() => handler({ _id, accept: true })}>
              Accept
            </Button>
            <Button
              color="error"
              onClick={() => handler({ _id, accept: false })}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    );
  });

  return (
    <Dialog open>
      <Stack
        p={{
          xs: "1rem",
          sm: "2rem",
        }}
        maxWidth={"25rem"}
      >
        <DialogTitle>Notifications</DialogTitle>
        {SampleNotifications.length > 0 ? (
          <>
            {SampleNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                sender={notification.sender}
                _id={notification._id}
                handler={friendRequestHandler}
              />
            ))}
          </>
        ) : (
          <Typography textAlign={"center"}>No Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default Notification;
