import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    // "createAsyncThunk" é uma função que permite usar dados assíncronos. "user" vem do formulário Register.jsx. aqui se registra um novo usuário
    console.log(user);
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => { // aqui loga um usuário
    console.log(user);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder permite adicionar cases
    },
});

export default authSlice.reducer;
