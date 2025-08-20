import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToys } from "../services/toy";

const initialState = {
    product: []
}

export const getAllProduct = createAsyncThunk(
    '/products/getAll',
    async () => {
        const { data, error } = await getToys();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { addProduct, removeProduct, clearError, resetStatus } = productSlice.actions;
export default productSlice.reducer;