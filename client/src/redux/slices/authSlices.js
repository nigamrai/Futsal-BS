import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem==undefined?JSON.parse(localStorage.getItem("data")):{} || {}

}
export const login=createAsyncThunk('auth/login',async(data)=>{
    try{
        const res=axiosInstance.post('/user/login',data);
        toast.promise(res,{
            loading:'Authentication on progress!',
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to log in"
        })
        return (await res).data;
    }catch(error){
        return error?.response?.data?.message;
    }
})
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(login.fulfilled,(state,action)=>{
            if(action?.payload){
                localStorage.setItem("data",JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("role",action?.payload?.user?.role);
                state.isLoggedIn=true;
                state.data=action?.payload?.user;
                state.role=action?.payload?.user?.role;
            }
        })
    }
})
export const {}=authSlice.actions;
export default authSlice.reducer;