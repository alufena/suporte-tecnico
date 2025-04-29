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

const getTicket = asyncHandler(async (req, res) => {
    // pega um único ticket do usuário; endpoint: /api/tickets/:id; acesso privado. GET request
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Esse usuário não existe');
    }
    const ticket = await Ticket.findById(req.params.id); // findById() vem do acesso à URL; "params" ajuda nesse sentido
    if (!ticket) {
        res.status(404);
        throw new Error('Esse ticket não existe');
    }
    if (ticket.user.toString() !== req.user.id) {
        // limita essa operação apenas ao usário (dono do ticket)
        res.status(401);
        throw new Error('Algo deu errado');
    }
    res.status(200).json(ticket);
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

const deleteTicket = asyncHandler(async (req, res) => {
    // deleta ticket. DELETE request. endpoint: /api/tickets/:id; acesso privado
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Esse usuário não existe');
    }
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Esse ticket não existe');
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Algo deu errado');
    }
    await ticket.remove(); // não existe necessidade de return nem de criar uma variável
    res.status(200).json({ success: true });
});

const updateTicket = asyncHandler(async (req, res) => {
    // atualiza um ticket. PUT request. endpoint: /api/tickets/:id. acesso privado
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Esse usuário não existe');
    }
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Esse ticket não existe');
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Algo deu errado');
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id, // pega o id da url. product (categoria) e descrição estarão na body
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedTicket);
});

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
};
