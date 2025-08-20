import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../services/toy";

const initialState = {
    items: []
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const categories = await getCategories();
        return categories;
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    }
});

export default categorySlice.reducer;