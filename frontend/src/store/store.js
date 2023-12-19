import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { authSlice } from "./features/auth/authSlice";



const rootReducer = combineReducers({
    auth: authSlice.reducer,
});


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};


const persistedReducer = persistReducer( persistConfig, rootReducer );


export const store = configureStore({
    reducer: persistedReducer,
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export const persistor = persistStore(store);