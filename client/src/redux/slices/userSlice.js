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