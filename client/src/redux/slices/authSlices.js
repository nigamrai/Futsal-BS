import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem==undefined?JSON.parse(localStorage.getItem("data")):{} || {}

}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:() => {

    }
})
export const {}=authSlice.actions;
export default authSlice.reducer;