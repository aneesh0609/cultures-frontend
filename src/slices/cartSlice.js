import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],      // items in cart
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }

      state.totalQuantity += item.quantity;
      state.totalPrice += item.price * item.quantity;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((i) => i._id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
