// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../services/orderService";

export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async ({ form, cartItems }, { rejectWithValue }) => {
    try {
      // Tính tổng tiền
      const total_amount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Tạo order + order_items
      const order = await createOrder(
        { user_id: form.user_id, total_amount },
        cartItems
      );

      return order;
    } catch (error) {
      return rejectWithValue(error.message || "Đặt hàng thất bại");
    }
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    form: {
      user_id: null,
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("✅ Đặt hàng thành công:", action.payload);
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateForm } = OrderSlice.actions;
export default OrderSlice.reducer;
