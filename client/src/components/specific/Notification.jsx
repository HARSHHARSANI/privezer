import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";
import { useErrors } from "../hooks/hook";
import toast from "react-hot-toast";

const Notification = () => {
  const disptach = useDispatch();

  const { isNotification } = useSelector((state) => state.misc);

  // console.log("isNotification", isNotification);

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  useErrors([{ isError, error }]);

  const handleNotificationClose = () => disptach(setIsNotification(false));

  const friendRequestHandler = async ({ _id, accept }) => {
    disptach(setIsNotification(false));
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept });

      if (res?.data?.success) {
        console.log("Use Socket to update the notification list");
        toast.success(res?.data?.message);
      } else {
        console.log(res?.data?.error || "An error occured");
        toast.error(error?.message || "An error occured");
      }
    } catch (error) {
      console.log(error);
    }
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
    <Dialog open={isNotification} onClose={handleNotificationClose}>
      <Stack
        p={{
          xs: "1rem",
          sm: "2rem",
        }}
        maxWidth={"25rem"}
      >
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              <>
                {data?.allRequests.map((notification) => (
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
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export default Notification;
