import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice'
import categoryReducer from '../CatagorySlice';
const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer
    },
});

export default store;

