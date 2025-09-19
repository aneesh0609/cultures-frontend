import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser as signupAPI, loginUser as loginAPI } from "../api/auth.js"; // import from your api folder

// ----- Async actions -----
// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginAPI(credentials); // call API function
      return data.user; // extract user info
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
      const data = await signupAPI(credentials); // call API function
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// ----- Slice -----
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,      // logged-in user
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // clear user on logout
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
