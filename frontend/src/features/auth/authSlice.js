import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// dar F5 faz o user ficar null; precisa não só salvar a user ao localstorage, mas fazer o user em um state inicial caso ele exista
const user = JSON.parse(localStorage.getItem('user')) // aqui irá pegar o usuário do localstorage

const initialState = {
    user: user ? user : null, // se existe o user, use o user; caso contrário, use o null
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        // "createAsyncThunk" é uma função que permite usar dados assíncronos. "user" vem do formulário Register.jsx. aqui se registra um novo usuário
        // console.log(user);
        try {
            return await authService.register(user);
        } catch (error) {
            const message = // pega mensagem do backend
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message); // coloca as possíveis mensagens de erro em um payload
        }
    }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    // aqui loga um usuário
    console.log(user);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            // reducer que volta ao valor default dos states. será chamado no componente Register
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        // "builder" permite adicionar "cases"
        builder
            .addCase(register.pending, (state) => {
                // chain de "addCase"
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false; // o pedido foi realizado
                state.isSuccess = true;
                state.user = action.payload; // similar ao context api
            })
            .addCase(register.rejected, (state, action) => {
                // caso algo dê errado
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; // se sabe que o payload vai ter essa mensagem porque está no state rejected. será chamada mais em cima do código "return thunkAPI.rejectWithValue(message)". bom porque não precisa lidar com tudo manualmente por conta do redux toolkit
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
