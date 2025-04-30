import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    tickets: [], // array para múltiplos tickets
    ticket: {}, // objeto para um único ticket
    isError: false, // contando com esa, são 4 propriedades correspondentes aos 4 recursos de redux
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createTicket = createAsyncThunk(
    // cria um ticket novo
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token; // objeto "thunkAPI" tem um método chamado getState que pega state de outras partes do projeto. aqui pega o token
            return await ticketService.createTicket(ticketData, token); // envia o token ao ticketService junto com a informação do ticket
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        // precisa enviar o token e acessar a rota protegida para enviar a informação
    }
);

export const getTickets = createAsyncThunk(
    // pega os tickets do usuário
    'tickets/getAll',
    async (_, thunkAPI) => {
        // "ticketData" foi substituído pelo placeholder "_", ou seja, significa que não passará nada mas continua acessando o thunkAPI (p/ pegar o token)
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getTicket = createAsyncThunk(
    'tickets/get',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTicket(ticketId, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState, // pega o state e retorna aos valores padrões
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                // será passado "action" porque "getTickets" pega informações
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload; // ticket = pedaço de state para um único objeto
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = ticketSlice.actions; // aqui exporta para "src/app/store.js"
export default ticketSlice.reducer;
