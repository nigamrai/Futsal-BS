import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlices";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
    }
})
export default store;