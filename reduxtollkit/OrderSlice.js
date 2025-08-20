// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// async thunk: giả lập gửi dữ liệu order lên server
export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // Ở đây có thể gọi API thật, ví dụ:
      // const res = await axios.post("http://localhost:3000/api/orders", orderData);
      // return res.data;

      // Demo giả lập
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return orderData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Đặt hàng thất bại");
    }
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    form: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    product: {
      name: "Mô Hình OnePiece zoro Chiến Đấu Siêu Ngầu Cao : 23.5cm nặng : 1000gram - One Piece - Hộp Màu K17-T4-S7",
      price: 150000,
      image:
        "https://bizweb.dktcdn.net/100/418/981/products/1-2717f3b8-0397-4ab3-8c5b-6bf183ee82b2.jpg?v=1755138997937",
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
        console.log("Đặt hàng thành công:", action.payload);
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateForm } = OrderSlice.actions;
export default OrderSlice.reducer;