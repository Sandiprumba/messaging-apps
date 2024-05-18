import { Dialog, Stack, DialogTitle, ListItem, Avatar, Typography, Button, Skeleton } from "@mui/material";
import { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useSelector, useDispatch } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  //applying redux
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
  //accept or reject will be boolean..function to accept request
  const friendRequestHandler = async ({ _id, accept }) => {
    //close the notification from screen
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting..", { requestId: _id, accept });
  };
  //using the redux handler
  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests && data.allRequests.length > 0 ? (
              data?.allRequests.map(({ sender, _id }) => <NotificationItem key={_id} sender={sender} _id={_id} handler={friendRequestHandler} />)
            ) : (
              <Typography align={"center"}>0 notification</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

//memo will help to not rerender until props changes
const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
NotificationItem.displayName = "Notificationitem";

export default Notifications;
