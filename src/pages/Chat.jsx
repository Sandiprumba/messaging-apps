import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton, Skeleton } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { grayColor, orange } from "../constants/color";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialog/FileMenu";

import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  //SOCKET IMPLEMENTATIONS FOR CHATS
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  //
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  //find the total page of the messages
  //rename so it wont collide
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, oldMessagesChunk.data?.totalPages, page, setPage, oldMessagesChunk.data?.message);

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  //keep outside cause using in multipole places
  const members = chatDetails?.data?.chat?.members;

  const messageOnchageHandler = (e) => {
    setMessage(e.target.value);

    //TRIGGER SOCKET EVENT TYPING
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    //cleaner function
    //clear the typing data and prevent it from printing the same data  many times
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  //ATTACHMENTS TO CHOOSE BUT ISSUE WITH THE CSS PART ...
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitMessageHandler = (e) => {
    e.preventDefault();
    //to prevent sedin empty spavce
    if (!message.trim()) return;

    //emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  //reset the message or when click on other user it should reset in order to see th meesage
  //to display user status online or offline
  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId, socket]);

  //to automatically scroll to the end of the messages every render of messages
  //THIS CHECKS IF BOTTOMREF.CURRENT IS NOT NULL OR UNDEFINED AND CALL SCROLLINTOVIEW WHEN BOTTOMREF.CURRENT IS AVAILABLE ...
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  //once user is removed from the group redirect to home page
  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError, navigate]);

  //useCallback is used to memoize the function
  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  //event listener for typing
  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("start typing", data);
      setUserTyping(true);
    },
    [chatId]
  );
  //stop typing listener
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("stop typing", data);
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "jhfaskdjf",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      //creating a new array that contains all the elements form the previous state..
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        {/* //js expression markup */}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitMessageHandler}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          {/* typing message  value */}
          <InputBox placeholder="Type Message Here" value={message} onChange={messageOnchageHandler} />
          <IconButton type="submit" sx={{ bgcolor: orange, color: "white", marginLeft: "1rem", padding: "0.5rem", "&:hover": { bgcolor: "error.dark" } }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

const ChatLayout = AppLayout()(Chat);
export default ChatLayout;
