import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postSlice from "./slices/posts"

const store = configureStore({
  reducer:{
    auth:authSlice,
    post:postSlice
  }
})

export default store