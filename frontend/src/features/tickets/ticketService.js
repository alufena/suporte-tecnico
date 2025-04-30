// aqui ocorre os requests

import axios from 'axios';

const API_URL = '/api/tickets/';
const createTicket = async (ticketData, token) => {
    const config = {
        // envio de token precisa estar no headers e no campo de autorização (como ocorre no postman)
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, ticketData, config);
    return response.data;
};

const ticketService = {
    createTicket,
};

export default ticketService;
