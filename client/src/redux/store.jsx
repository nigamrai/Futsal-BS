import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlices";
import bookingSliceReducer from "./slices/bookingSlice";
import futsalSliceReducer from "./slices/futsalSlice";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        futsal:futsalSliceReducer,
        booking:bookingSliceReducer
    }
})
export default store;