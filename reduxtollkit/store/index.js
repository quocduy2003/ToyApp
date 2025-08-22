import { configureStore } from '@reduxjs/toolkit';
import CartSlice from '../CartSlice';
import categoryReducer from '../CategorySlice';
import OrderSlice from '../OrderSlice';
import productReducer from '../ProductSlice';
import userReducer from '../UserSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    order: OrderSlice,
    cart: CartSlice,
    categories: categoryReducer,
    user: userReducer
  },
});

export default store;

