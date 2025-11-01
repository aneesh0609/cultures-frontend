// src/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance.js";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      console.log("API URL →", import.meta.env.VITE_API_URL);

      const response = await axios.get("/product/getAll-products");
      // backend returns { success: true, product: [...] }
      return response.data.product; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Create a new product
export const createProductAsync = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post("/product/create-product", productData);
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// Update a product
export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updates }, thunkAPI) => {
    try {
      const response = await axios.put("/product/update-products", { productId, updates });
      return response.data.updatedProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// Delete a product
export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      await axios.delete("/product/delete-products", { data: { productId } });
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update product
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
