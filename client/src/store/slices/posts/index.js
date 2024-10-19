import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  url: `${import.meta.env.VITE_API_URL}`,
};

export const jobPost = createAsyncThunk("/jobPost",
  async(formData,{rejectWithValue})=>{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/job/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
      console.error("Error response:", error.response);
    }
  }
)

const postSlice = createSlice({
  name:"postSlice",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(jobPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(jobPost.fulfilled, (state, action) => {
        (state.isLoading = false)
      })
      .addCase(jobPost.rejected, (state) => {
        (state.isLoading = false)
      });
  }
})

export default postSlice.reducer;