import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlices";
import futsalSliceReducer from "./slices/futsalSlice";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        futsal:futsalSliceReducer
    }
})
export default store;