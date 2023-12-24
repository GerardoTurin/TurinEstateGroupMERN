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
            state.user = null;
            if ( payload ) {    //^ Si el payload existe, es porque se está llamando a la acción onLogout desde el catch de una petición http.
                state.errorMenssage = payload;
            }
        },
        onUpdateUser: (state, { payload }) => {
            state.status = 'active';
            state.user = { ...state.user, ...payload };   //^ Actualiza el usuario con los nuevos datos, pero mantiene los antiguos, si no se actualizan.
            state.errorMenssage = null;
        },
        onDeleteUser: (state) => {
            state.status = 'no-register';
            state.user = null;
            state.errorMenssage = null;
        },
        clearError: (state) => {
            state.errorMenssage = null;
        }
    },
});

export const { checkLogin, checkRegister, onSignIn, onLogout, onActiveAccount, onUpdateUser, onDeleteUser, clearError } = authSlice.actions;