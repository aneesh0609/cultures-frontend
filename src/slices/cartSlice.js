import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/cart/getcart");
    return res.data.cart.items;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
  }
});

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await axios.post("/cart/addtocart", { productId, quantity });
      return res.data.cart.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add to cart");
    }
  }
);

// Update quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await axios.put("/cart/updatecart", { productId, quantity });
      return res.data.cart.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update cart");
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      const res = await axios.delete("/cart/removecart", { data: { productId } });
      return res.data.cart.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to remove from cart");
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    const res = await axios.put("/cart/clearcart");
    return res.data.cart.items;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to clear cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // ✅ Reset cart on logout
    resetCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Add to cart
      .addCase(addToCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addToCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update quantity
      .addCase(updateCartQuantity.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateCartQuantity.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(updateCartQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeFromCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(removeFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Clear cart
      .addCase(clearCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(clearCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(clearCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
