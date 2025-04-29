const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
    // pega tickets do usuário. rota: /api/tickets; acesso privado; GET request
    const user = await User.findById(req.user.id); // pega usuário pelo jsonwebtoken, pois jwt inclui o user id. quando se valida o token, é feito um "req.user" pelo middleware
    if (!user) {
        res.status(401);
        throw new Error('Esse usuário não existe');
    }
    const tickets = await Ticket.find({ user: req.user.id }); // ocorre uso do "ticketModel"
    // res.status(200).json({
    //     message: 'getTickets',
    // });
    res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
    // cria um novo ticket. rota: /api/tickets; acesso privado; POST request
    const { product, description } = req.body;
    if (!product || !description) {
        // certifica de enviar product e
        // description
        res.status(400);
        throw new Error(
            'Por favor, adicione uma categoria e uma descrição do problema'
        );
    }
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Esse usuário não existe');
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'novo',
    });
    res.status(201).json(
        // ao invés de 200 será 201 (criado)
        ticket
    );
});

module.exports = {
    getTickets,
    createTicket,
};
