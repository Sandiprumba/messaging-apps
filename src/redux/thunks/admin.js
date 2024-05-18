import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/config";
import axios from "axios";

// ASYNC ACTION CREATOR RESPONSIBLE FOR LIGGIN IN AN ADMIN USING A SECRET KEY ...
const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${server}/api/v1/admin/verify`, { secretKey }, config);

    return data.message;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
});
//GET ADMIN DATA AFTER THE SECRETKEY VERIFICATIONS..COOKIE HAS BEEN RECORDED
const getAdmin = createAsyncThunk("admin/getAdmin", async (secretKey) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });
    return data.admin;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
});

const adminLogout = createAsyncThunk("admin/adminLogout", async (secretKey) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout/`, { withCredentials: true });
    return data.message;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
});

export { adminLogin, getAdmin, adminLogout };
