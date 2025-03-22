import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("authToken");

const initialState: string | null = storedToken ? storedToken : null;

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        addToken: (_state, action: PayloadAction<string>) => {
            localStorage.setItem("authToken", action.payload);
            return action.payload;
        },
        removeToken: () => {
            localStorage.removeItem("authToken");
            return null;
        }
    }
})

export const {actions, reducer} = tokenSlice