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
            success:"Futsal data loaded successfully",
            error:"Failed to fetch futsal details"
        })
        console.log((await res).data.futsal);
        return (await res).data.futsal
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
            if(action?.payload){
                state.futsalData=[action.payload];
            }
        })
    }
})
export default futsalSlice.reducer;