import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    futsalData:[]
}
export const futsalDetails=createAsyncThunk('/futsal/getDetails',async()=>{
    try{
        const res=axiosInstance.post('/futsal/getDetails');
        toast.promise(res,{
            loading:"Waiting to fetch futsal Data",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to fetch futsal details"

        })
        return (await res).data
    }catch(error){
        return error?.response?.data?.message
    }
})
const futsalSlice=createSlice({
    name:'futsal',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(futsalDetails.fulfilled,(state,action)=>{
            state.futsalData=[...action.payload];
        })
    }
})
export default futsalSlice.reducer;