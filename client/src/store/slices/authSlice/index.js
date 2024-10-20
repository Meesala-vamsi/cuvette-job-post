import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  url: `${import.meta.env.VITE_API_URL}`,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
        {
          withCredentials:true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        {
          withCredentials:true
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/auth-check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
          },
          withCredentials:true
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyEmailOTP = createAsyncThunk("/auth/verifyEmail",
  async(otp,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verifyEmail`,{ enteredEmailOTP: otp },{
        withCredentials:true
      });
      return response?.data
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
)

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserStatus: () => {},
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.data),
          (state.isAuthenticated = true),
          (state.token = action.payload.token);
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(verifyEmailOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmailOTP.fulfilled, (state) => {
        (state.isLoading = false)
      })
      .addCase(verifyEmailOTP.rejected, (state) => {
        (state.isLoading = false)
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.user),
          (state.isAuthenticated = true);
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false),
          (state.token = null);
      });
  },
});


export const { resetTokenAndCredentials } = authSlice.actions;

export default authSlice.reducer;