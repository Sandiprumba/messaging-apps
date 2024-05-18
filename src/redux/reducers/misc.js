//reducers is a pure function in redux that specifies how the applications state changes in response to actions sent to the redux store. its a funcamental concept in redux responsible for managing that state of the application..
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};
//reducer is a pure functino in redux that specifies how the applications state changes in response to actions sent to the redux store...
//PAYLOAD TYPICALLY REFERS TO THE DATA THAT ACCOMPANIES AN ACTION..
const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    //state parameter represents the currrent state managed by the slice
    //action represents the action dispatched to the redux store
    //here payload refers to the value that is oassed along with the action when its dispatched..
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setIsUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setIsSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});

export default miscSlice;
export const { setIsNewGroup, setIsMember, setIsNotification, setIsMobile, setIsSearch, setIsFileMenu, setIsDeleteMenu, setIsUploadingLoader, setIsSelectedDeleteChat } =
  miscSlice.actions;
