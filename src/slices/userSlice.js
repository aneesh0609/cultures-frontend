// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

// ---- Async Actions ----

// Fetch current user info
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/user/getusers", { withCredentials: true });
      return res.data.user; // expected response: { user: { ... } }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user info");
    }
  }
);

// Update user info
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (updates, thunkAPI) => {
    try {
      const res = await axios.put("/user/update", updates, { withCredentials: true });
      // Sync updated user with auth slice
      thunkAPI.dispatch({ type: "auth/loginUser/fulfilled", payload: res.data.updatedUser });
      return res.data.updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update user info");
    }
  }
);

// Delete user account
export const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (_, thunkAPI) => {
    try {
      const res = await axios.delete("/user/delete", { withCredentials: true });
      // Clear user from auth slice
      thunkAPI.dispatch({ type: "auth/logoutUser/fulfilled" });
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete account");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearUserMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user info
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.successMessage = "User info updated successfully";
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user account
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.successMessage = action.payload;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserMessage } = userSlice.actions;
export default userSlice.reducer;
