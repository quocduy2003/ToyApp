import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice'
import OrderSlice from '../OrderSlice';
import CartSlice from '../CartSlice';
import categoryReducer from '../CategorySlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    order: OrderSlice,
    cart: CartSlice,
    categories: categoryReducer

  },
});

export default store;

