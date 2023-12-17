import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'no-register', // no-register, checking, no-active, active
    user: null,
    errorMenssage: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkLogin: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMenssage = null;
        },
        checkRegister: (state) => {
            state.status = 'no-active';
            state.user = {};
            state.errorMenssage = null;
        },
        onSignIn: (state, { payload }) => {
            state.status = 'active';
            state.user = payload;
            state.errorMenssage = null;
        },
        onActiveAccount: (state, { payload }) => {
            state.status = 'active';
            state.user = payload;
            state.errorMenssage = null;
        },
        onLogout: (state, { payload }) => {
            state.status = 'no-register';
            state.user = {};
            if ( payload ) {    //^ Si el payload existe, es porque se está llamando a la acción onLogout desde el catch de una petición http.
                state.errorMenssage = payload;
            }
        },
        onUpdateUser: (state, { payload }) => {
            state.user = payload;
        },
        clearError: (state) => {
            state.errorMenssage = null;
        }
    },
});

export const { checkLogin, checkRegister, onSignIn, onLogout, onActiveAccount, onUpdateUser ,clearError } = authSlice.actions;