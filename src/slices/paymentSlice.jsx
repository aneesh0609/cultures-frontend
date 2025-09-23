// src/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

// 1️⃣ Create Razorpay Order (Backend Order + Razorpay Order)
export const createPaymentOrder = createAsyncThunk(
  "payment/createPaymentOrder",
  async ({ orderId }, thunkAPI) => {
    try {
      const res = await axios.post("/payments/create-payment", { orderId }, { withCredentials: true });
      return res.data; // Contains razorpayOrder + key + paymentId
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create payment order");
    }
  }
);

// 2️⃣ Verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, thunkAPI) => {
    try {
      const res = await axios.post("/payments/verify-payment", paymentData, { withCredentials: true });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Payment verification failed");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    razorpayOrder: null,
    paymentId: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPayment: (state) => {
      state.razorpayOrder = null;
      state.paymentId = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Payment Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload.razorpayOrder;
        state.paymentId = action.payload.paymentId;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
