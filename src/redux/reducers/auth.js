import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, getAdmin } from "../thunks/admin";
import { toast } from "react-hot-toast";
//DEFINING REDUX SLICE
//slice refers to a portion of application state and related logic for updating that state..

//define the initial state object defines the initial state for a slice of redux state tree
const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

//name of the slice
//initial state define the initial state of the slice .. its a plain js object
const authSlice = createSlice({
  name: "auth",
  initialState,
  //reducer contains a set of reducer functions its responsible for updating a specific part of the slices state this defines how the state changes..
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  //normal builder function ...cases
  //PAYLOAD CARRIES ANY ADDITIONAL DATA THAT NEEDS TO BE SENT ALONG WITH THE ACTION...
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message);
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAdmin = true;
        } else {
          state.isAdmin = false;
        }
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message); //optional
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload);
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isAdmin = true;
        toast.error(action.error.message);
      });
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
