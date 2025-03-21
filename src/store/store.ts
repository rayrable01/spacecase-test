import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as tokenReducer } from "./token/token.slice";

const reducers = combineReducers({
    token: tokenReducer
})

export const store = configureStore({
    reducer: reducers
})