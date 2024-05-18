import { Dialog, DialogTitle, Stack, Typography, Button, Skeleton } from "@mui/material";
import UserItem from "../shared/UserItem";
import { useEffect, useState } from "react";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) : [...prev, id]));
    console.log("selected members", selectedMembers);
  };
  console.log(selectedMembers);
  useEffect(() => {
    console.log("selected members", selectedMembers);
  }, [selectedMembers]);

  const closeHandler = () => {
    setSelectedMembers([]);
    dispatch(setIsMember(false));
  };

  const addMemberSubmitHandler = () => {
    console.log("add member submit handler");
    addMembers("Adding members", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add memeber</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />)
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" disabled={isLoadingAddMembers} onClick={addMemberSubmitHandler}>
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;

// {
//   sampleUsers.map((i) => <UserItem key={i.id} user={i} handler={addFriendHandler} />);
// }
