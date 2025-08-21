import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToys } from "../services/toy";
import { getNewestToys, fetchFeaturedProducts, getBestSellerProducts } from "../services/category";

const initialState = {
    items: [],
    newest: [],
    featured: [],
    bestSellers: [],
    latestItems: [],
    searchResults: [],
    searchStatus: 'idle',
    selectedItem: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    newestStatus: "idle",
    featuredStatus: "idle",
    bestSellerStatus: "idle",
    error: null,
};

// Lấy toàn bộ sản phẩm
export const getAllProduct = createAsyncThunk("/products/getAll", async () => {
    const data = await getToys();
    // console.log("getAllProduct", data);
    return data;
});

// Lấy 6 sản phẩm mới nhất theo created_at
export const getNewestProducts = createAsyncThunk(
    "/products/getNewest",
    async () => {
        const data = await getNewestToys();
        return data;
    }
);
export const searchProducts = createAsyncThunk(
    '/products/search',
    async (keyword) => {
        console.log('keyword:', keyword);

        const data = await searchToys(keyword); // Gọi API tìm kiếm
        // console.log("searchProductsAsync", data);
        return data;
    }
)
// Lấy 6 sản phẩm nổi bật theo id 1,2,3,4,5,6
export const getFeaturedProducts = createAsyncThunk(
    "products/getFeatured",
    async () => {
        return await fetchFeaturedProducts();
    }
);

// Lấy 5 sản phẩm bán chạy theo quantity trong order_items
export const fetchBestSellers = createAsyncThunk(
    "products/fetchBestSellers",
    async () => {
        const data = await getBestSellerProducts();
        return data;
    }
);

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
            // getAllProduct

            .addCase(getAllProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                // console.log("getAllProduct fulfilled", state.items );
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.status = "failed";
            })

            // Search product
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
            })

            // getNewestProducts

            .addCase(getNewestProducts.pending, (state) => {
                state.newestStatus = "loading";
            })
            .addCase(getNewestProducts.fulfilled, (state, action) => {
                state.newestStatus = "succeeded";
                state.newest = action.payload;
            })
            .addCase(getNewestProducts.rejected, (state, action) => {
                state.newestStatus = "failed";
                state.error = action.error.message;
            })

            // featured
            .addCase(getFeaturedProducts.pending, (state) => {
                state.featuredStatus = "loading";
            })
            .addCase(getFeaturedProducts.fulfilled, (state, action) => {
                state.featuredStatus = "succeeded";
                state.featured = action.payload;
            })
            .addCase(getFeaturedProducts.rejected, (state, action) => {
                state.featuredStatus = "failed";
                state.error = action.error.message;
            })

            // bestSellers
            .addCase(fetchBestSellers.pending, (state) => {
                state.bestSellerStatus = "loading";
            })
            .addCase(fetchBestSellers.fulfilled, (state, action) => {
                state.bestSellerStatus = "succeeded";
                state.bestSellers = action.payload;
            })
            .addCase(fetchBestSellers.rejected, (state, action) => {
                state.bestSellerStatus = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    resetSearch,
    clearError,
    resetStatus,
    getProductById
} = productSlice.actions;
export default productSlice.reducer;
