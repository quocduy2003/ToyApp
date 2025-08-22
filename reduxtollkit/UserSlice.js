import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';
import { ensureUserExists, getUserById } from '../services/userService';

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

// Đăng nhập user với Supabase
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData, { rejectWithValue }) => {
        try {
            const { email, password } = loginData;
            
            // Đăng nhập với Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw new Error(error.message);
            }

            // Kiểm tra và tạo user trong bảng users nếu chưa tồn tại
            const userInfo = await ensureUserExists(data.user);

            // Lưu session
            const session = data.session;
            const expiresAt = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
            await AsyncStorage.setItem(
                "customSession",
                JSON.stringify({ 
                    access_token: session.access_token, 
                    expiresAt,
                    user: userInfo 
                })
            );

            return { session: data.session, user: userInfo };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Lấy thông tin user hiện tại từ session
export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const sessionData = await AsyncStorage.getItem("customSession");
            if (!sessionData) {
                throw new Error('No session found');
            }

            const { user } = JSON.parse(sessionData);
            if (user) {
                // Lấy thông tin user mới nhất từ database
                const updatedUser = await getUserById(user.id);
                return updatedUser;
            }
            
            throw new Error('No user found in session');
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
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearError: (state) => {
            state.error = null;
        }
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
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
            });
    },
});

export const { logoutUser, setUser, clearError } = userSlice.actions;
export default userSlice.reducer;