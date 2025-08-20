import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Đăng ký user
export const registerUser = createAsyncThunk (
    'user/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại');
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Đăng nhập user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;