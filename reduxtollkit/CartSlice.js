import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productList: [], // ✅ ban đầu giỏ hàng trống
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.productList.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        state.productList.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.productList.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.productList.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.productList = state.productList.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.productList = [];
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
