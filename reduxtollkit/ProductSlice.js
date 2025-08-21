import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToys } from "../services/toy";

const initialState = {
    items: [],
    selectedItem: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const getAllProduct = createAsyncThunk(
    '/products/getAll',
    async () => {
        const data = await getToys();
        // console.log("getAllProduct", data);
        return data;
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductById:(state, action)=>{
            const id= action.payload;
            state.selectedItem = state.items.find(item => item.id === id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                // console.log("getAllProduct fulfilled", state.items );
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { addProduct, removeProduct, clearError, resetStatus } = productSlice.actions;
export default productSlice.reducer;