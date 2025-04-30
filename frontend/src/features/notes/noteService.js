import axios from 'axios';

const API_URL = '/api/tickets/';

const getNotes = async (ticketId, token) => {
    // pega anotações de um ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + ticketId + '/notes', config); // a concatenação certifica de atingir o endpoint desejado
    return response.data;
};

const noteService = {
    getNotes,
};

export default noteService;
