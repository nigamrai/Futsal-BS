import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";


const initialState={
    userData:[]
}
export const userDetails=createAsyncThunk('/user/getDetails',async()=>{
    try{
        const res=axiosInstance.post('/user/getUsers');
        toast.promise(res,{
            loading:"Waiting to fetch user Data",
            success:"User data loaded successfully",
            error:"Failed to fetch user details"
        })
        console.log((await res).data.users);
        return (await res).data.users
    }catch(error){
        return error?.response?.data?.message
    }
})
export const deleteUser=createAsyncThunk("/user/delete",async(userId)=>{
    try{
        const res=axiosInstance.delete(`/user/removeUser/${userId}`);
        toast.promise(res,{
            loading:"Waiting to delete user",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to delete user"
        })
        return (await res).data;
    }catch(error){
        toast.error(error?.response.data?.message);
    }
})

export const editUser=createAsyncThunk("user/edit",async(data)=>{
    try{
        const res=axiosInstance.put(`/user/edit`,data);
        toast.promise(res,{
            loading:"Waiting to edit user",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to edit user"
        })
        return (await res).data;
    }catch(error){
        toast.error(error?.response.data?.message);
    }
})
const userSlice=createSlice({
    name:'user',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(userDetails.fulfilled,(state,action)=>{
            if(action?.payload){
                state.userData=[...action.payload];
            }
        })
    }
})
export default userSlice.reducer;