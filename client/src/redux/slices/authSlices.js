import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
};  

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      loading: "Authentication on progress!",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/signup", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const setPasswordThunk=createAsyncThunk('auth/signup/password',async(data)=>{
  try{
    const res=axiosInstance.post("/user/set-password",data);
    toast.promise(res,{
      loading:"Waiting to set password",
      success:(data)=>{
        return data?.data?.message
      },
      error:"Faild to set password"
    })
    return (await res).data;
  }catch(err){
    toast.error(err?.response?.data?.message);
  }
})
export const confirmation=createAsyncThunk("auth/user/confirmation",async(token)=>{
  try{
    const res=axiosInstance.get(`/user/confirm/${token}`);
    toast.promise(res,{
      loading:'Confirming....',
      success:(data)=>{
        return data?.data?.message
      },
      error:"Failed to confirm"
    })
    return (await res).data;
  }catch(error){
    toast.error(error?.response?.data?.message);
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = axiosInstance.get("/user/logout");
    toast.promise(res, {
      loading: "Waiting to log out",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
    return (await res).data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action?.payload) {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
