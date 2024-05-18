import { Dialog, Stack, DialogTitle, Typography, TextField, Button, Skeleton } from "@mui/material";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

//Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.
const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  console.log("this is data", data);

  //GET MY FRIEND if error
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  //select the friends to create a groups ..
  //PREV IS AND ARROW FUNCTION USED AS AN ARGUMENT TO SETSELECTEDMEMBERS IT TAKES THE PREVIOUS STATE PREV AS INPUT AND RETURNS THE NEW STATE BASED ON CERTAIN CONDITIONS...
  //PREV.INCLUDES THIS CHECKS IF THE PREV ARRAY INCLUDES THE ID THAT WE WANT TO TOGGLE
  //PREV.FILTER IF THE ID IS ALREADY IN THE PREV ARRAY THIS REMOVES IT FROM THE ARRAY USING THE FILTER METHOD IT FILTERS OUT THE ID WE WANT TO REMOVE
  //[...PREV, ID] IF THE ID IS NOT THE PREV ARRAY IT ADDS THE ID TO THE END OF THE ARRAY USING SPREAD OPERATOR AND CREATES A NEW ARRAY WITH ALL THE RPEVIOUS ELEMENTS AND ADDS THE ID AT THE END ,,,
  const selectMemberHandler = (id) => {
    //if the userid and function id is true then the toggle will be false

    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) : [...prev, id]));
  };

  //submit to create a group
  const submitHandler = () => {
    //creating the group
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2) return toast.error("please select at least 3 members");
    //and call the close handler after creating group
    //must send toast message to create the group else will give childs error
    newGroup("Creating new Group", { name: groupName.value, members: selectedMembers });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {/* //used loading here */}
          {isLoading ? <Skeleton /> : data?.friends?.map((i) => <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />)}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="text" color="error" size="large" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
