import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axiosInstance from "../../Helpers/axiosInstance";
const initialState={
    bookedData:[],
    isMount:false
}

export const createNewBooking=createAsyncThunk('booking/create',async(data)=>{
    try{
        const res=axiosInstance.post('/booking/create',data);
        toast.promise(res,{
            loading:'Waiting to book',
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to book"
        })
        return (await res).data.booked
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})
export const getAllBookings=createAsyncThunk('booking/getBookings',async(data)=>{
    try{
        const res=axiosInstance.get('/booking/getBookings');
        toast.promise(res,{
            loading:'Waiting to fetch all booking details',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to fetch data'
        })
        console.log((await res).data.bookings);
        return (await res).data.bookings;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const bookingSlice=createSlice({
    name:"booking",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllBookings.fulfilled,(state,action)=>{
            if(action?.payload){
               state.bookedData=[...action.payload];
               state.isMount=true;
            }
        })
    }
})
export const deleteBooking=createAsyncThunk("/booking/delete",async(bookingId)=>{
    try{
        const res=axiosInstance.delete(`/booking/removeBooking/${bookingId}`);
        toast.promise(res,{
            loading:"Waiting to delete data",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to delete data"
        })
        console.log(await res).data;
        return (await res).data;
    }catch(error){
        toast.error(error?.response.data?.message);
    }
})

export default bookingSlice.reducer;