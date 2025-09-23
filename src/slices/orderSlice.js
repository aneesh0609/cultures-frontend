// src/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

// ---- Async Actions ----

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const res = await axios.post("/order/create-order", orderData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
  }
);

// Get All Orders
export const fetchOrders = createAsyncThunk("order/fetchOrders", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/order/getorders", { withCredentials: true });
    return res.data.orders;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
  }
});

// Get Order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/order/getorderbyid/${id}`, { withCredentials: true });
      return res.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch order");
    }
  }
);

// Cancel Order
export const cancelOrder = createAsyncThunk("order/cancelOrder", async (id, thunkAPI) => {
  try {
    const res = await axios.post(`/order/cancel-order/${id}`, {}, { withCredentials: true });
    return res.data.order;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to cancel order");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderDetails: null,
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderSummary: (state) => {
      state.summary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order by ID
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      });
  },
});

export const { clearOrderSummary } = orderSlice.actions;
export default orderSlice.reducer;
