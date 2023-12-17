import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";




export const store = configureStore({
    reducer: {
        // Aqui se agregan los reducers.
        auth: authSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});