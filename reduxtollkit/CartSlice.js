import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/toy";

// Async thunk gọi API
export const getProducts = createAsyncThunk("cart/getProducts", async () => {
  const data = await fetchProducts();
  // thêm quantity mặc định = 1 cho từng sản phẩm
  return data.map((item) => ({
    ...item,
    quantity: 1,
  }));
});

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    productList: [],
    loading: false,
    error: null,
  },
  reducers: {
    increaseQuantity: (state, action) => {
      const item = state.productList.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.productList.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action) => {
      state.productList = state.productList.filter(
        (p) => p.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.productList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
