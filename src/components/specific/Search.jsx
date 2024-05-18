import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { Dialog, Stack, DialogTitle, TextField, InputAdornment, List } from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { useAsyncMutation } from "../../hooks/hook";

//stack is a container component for arranging elements vertically or horizontally
//Dialog inform users about a task and can contain critical information require decisions or involve multiple tasks. simply .. its a type of modal window that appears in front of  app content to provide critical information or ask for desicion.
//INPUTADORNMENT is a component provided by mui that allows you to add visual ekements to the begining or end of an input component such as textfield

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  //created hook in hook page
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const dispatch = useDispatch();
  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  //debouncing method
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack padding={"2rem"} direction={"column"} alignItems={"center"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => {
            return <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />;
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
