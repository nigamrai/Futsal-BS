import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
  bookedData: [],
};

export const createNewBooking = createAsyncThunk(
  "booking/create",
  async (data) => {
    try {
      const res = axiosInstance.post("/booking/create", data);
      toast.promise(res, {
        loading: "Waiting to book",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to book",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const getAllBookings = createAsyncThunk(
  "booking/getBookings",
  async (data) => {
    try {
      const res = axiosInstance.get("/booking/getBookings");
      // toast.promise(res,{
      //     loading:'Waiting to fetch all booking details',
      //     success:(data)=>{
      //         return data?.data?.message;
      //     },
      //     error:'Failed to fetch data'
      // })
      return (await res).data.bookings;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const getMyBookings = createAsyncThunk("/booking/me", async (userId) => {
  try {
    const res = axiosInstance.get(`/booking/getMyBooking/${userId}`);
    return (await res).data.bookings;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      if (action?.payload) {
        state.bookedData = [...action.payload];
      }
    });
  },
});
export const deleteBooking = createAsyncThunk(
  "/booking/delete",
  async (bookingId) => {
    try {
       await axiosInstance.delete(`/booking/removeBooking/${bookingId}`);
    } catch (error) {
      return toast.error(error?.response.data?.message);
    }
  }
);

export const editBooking = createAsyncThunk(
  "booking/edit",
  async (bookingId) => {
    try {
      const res = axiosInstance.get(`/booking/editBooking/${bookingId}`);
      toast.promise(res, {
        loading: "Waiting to edit BookingTime",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to edit BookingTime",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response.data?.message);
    }
  }
);

export default bookingSlice.reducer;
