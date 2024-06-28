import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    paymentData:[]
}
export const handlePayment=createAsyncThunk("order/payment",async(data)=>{
    try{
        const res=axiosInstance.post("/booking/payment/create",data);
        return(await res).data;
    }catch(error){
        return error?.response?.data?.message;
    }
})
const paymentSlice=createSlice({
    name:'payment',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})
export default paymentSlice.reducer;