import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    productList: [
      {
        id: "1",
        name: "Mô Hình OnePiece zoro Chiến Đấu Siêu Ngầu Cao : 33cm nặng : 1000gram - One Piece - Hộp Carton -K14-T4-S3",
        price: 100000,
        quantity: 1,
        image:
          "https://bizweb.dktcdn.net/100/418/981/products/1-a5c3dbe3-1a34-4618-b43e-104276627c3c.jpg?v=1755068078660",
      },
      {
        id: "2",
        name: "Mô Hình OnePiece zoro Chiến Đấu Siêu Ngầu Cao : 23.5cm nặng : 1000gram - One Piece - Hộp Màu K17-T4-S7",
        price: 150000,
        quantity: 1,
        image:
          "https://bizweb.dktcdn.net/100/418/981/products/1-2717f3b8-0397-4ab3-8c5b-6bf183ee82b2.jpg?v=1755138997937",
      },
    ],
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
});

export const {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;