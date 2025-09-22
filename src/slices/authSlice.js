import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signupUser as signupAPI, loginUser as loginAPI } from "../api/auth.js";
import { resetCart } from "./cartSlice";

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginAPI(credentials);
      setTimeout(() => window.location.reload(), 300);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Signup user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await signupAPI(credentials);
      setTimeout(() => window.location.reload(), 300);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      
      // ✅ Reset cart when logging out
      thunkAPI.dispatch(resetCart());

      setTimeout(() => window.location.reload(), 300);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;
