import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice'
import OrderSlice from '../OrderSlice';
import CartSlice from '../CartSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        order: OrderSlice,
        cart: CartSlice,
    },
});

export default store;

