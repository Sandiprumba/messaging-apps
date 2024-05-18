import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/event";

//define initital state

const initialState = {
  notificationCount: 0,
  //if there is data inside localstorage then it will .. retrive data from local storage
  newMessagesAlert: getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, get: true }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};
//create slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    //reducer to find the specific index of the chat in the new message alert
    setNewMessagesAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessagesAlert.findIndex((item) => item.chatId === action.payload.chatId);
      //to target the specific index in array so need to write like this
      //this will count the number of messages if 1 then will add to 2
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
    },
    //  remove the number when user click on the messages
    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter((item) => item.chatId !== action.payload);
    },
  },
});

export default chatSlice;
export const { incrementNotification, resetNotificationCount, setNewMessagesAlert, removeNewMessagesAlert } = chatSlice.actions;
