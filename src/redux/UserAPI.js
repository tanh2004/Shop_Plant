import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helpers/AxiosInstance";

export const login = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post("/users/login", data);
            console.log(response);
            if (response.status == true) {
                return response.data;
            } else {
                return rejectWithValue(error);
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);