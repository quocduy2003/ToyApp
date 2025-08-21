import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToys } from "../services/toy";

const initialState = {
    items: [],
    selectedItem: null,
    latestItems: [],
    searchResults: [],
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
export const searchProductsAsync = createAsyncThunk(
    '/products/search',
    async (keyword) => {
        const data = await searchToys(keyword); // Gọi API tìm kiếm
        // console.log("searchProductsAsync", data);
        return data;
    }
)


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductById: (state, action) => {
            const id = action.payload;
            state.selectedItem = state.items.find(item => item.id === id);
            // console.log('getProductById product:', state.items.find(item => item.id === id));
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
            })
            .addCase(searchProductsAsync.pending, (state) => {
                state.searchStatus = 'loading';
            })
            .addCase(searchProductsAsync.fulfilled, (state, action) => {
                state.searchStatus = 'succeeded';
                state.searchResults = action.payload;
                // console.log("searchProductsAsync fulfilled", state.searchResults);
            })
            .addCase(searchProductsAsync.rejected, (state) => {
                state.searchStatus = 'failed';
            });
    }
})


export const { getProductById } = productSlice.actions;
export default productSlice.reducer;