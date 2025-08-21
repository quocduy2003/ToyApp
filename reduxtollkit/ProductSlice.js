import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToys, searchToys } from "../services/toy";

const initialState = {
    items: [],
    selectedItem: null,
    latestItems: [],
    searchResults: [],
    earchStatus: 'idle',
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
export const searchProducts = createAsyncThunk(
    '/products/search',
    async (keyword) => {
        console.log('keyword:', keyword);

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
        },
        getLatestProducts: (state) => {
            const sortedItems = [...state.items].sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : 0;
                const dateB = b.createdAt ? new Date(b.createdAt) : 0;
                return dateB - dateA;
            });
            state.latestItems = sortedItems.slice(0, 6);
        },
        resetSearch: (state) => {
            state.searchResults = [];
            state.searchStatus = 'idle';
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
            .addCase(searchProducts.pending, (state) => {
                state.searchStatus = 'loading';
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchStatus = 'succeeded';
                state.searchResults = action.payload;
                // console.log("searchProducts fulfilled", state.searchResults);
            })
            .addCase(searchProducts.rejected, (state) => {
                state.searchStatus = 'failed';
            });
    }
})


export const { getProductById, resetSearch } = productSlice.actions;
export default productSlice.reducer;