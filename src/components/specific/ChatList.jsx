import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import ChatItem from "../shared/ChatItem";

//this is receiving data from appLayout as a props
const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        //destructure the data
        const { avatar, name, _id, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);

        const isOnline = members?.some((member) => onlineUsers.includes(member));
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

ChatList.propTypes = {
  w: PropTypes.string, // Add prop type validation for 'w'
  chats: PropTypes.array,
  chatId: PropTypes.string,
  onlineUsers: PropTypes.array,
  newMessagesAlert: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string,
      count: PropTypes.number,
    })
  ),
  handleDeleteChat: PropTypes.func,
};

export default ChatList;
