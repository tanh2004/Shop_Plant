// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../helpers/AxiosInstance';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance().post('users/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.error = null;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : 'Registration failed';
    },
  },
});

export default authSlice.reducer;
