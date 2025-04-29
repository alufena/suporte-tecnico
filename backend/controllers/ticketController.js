const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
    // pega tickets do usuário. rota: /api/tickets; acesso privado; GET request
    res.status(200).json({
        message: 'getTickets',
    });
});

const createTicket = asyncHandler(async (req, res) => {
    // cria um novo ticket. rota: /api/tickets; acesso privado; POST request
    res.status(200).json({
        message: 'createTicket',
    });
});

module.exports = {
    getTickets,
    createTicket,
};
