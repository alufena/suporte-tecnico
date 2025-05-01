const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
    // pega anotações a um ticket. GET request. endpoint: /api/tickets/:ticketId/notes. acesso privado
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Essa anotação não existe');
    }
    const ticket = await Ticket.findById(req.params.ticketId); // pega id da url
    if (ticket.user.toString() !== req.user.id) {
        // certifica ser o ticket do usuário. "req.user.id" é o token
        res.status(401);
        throw new Error('Algo deu errado');
    }
    const notes = await Note.find({ ticket: req.params.ticketId });
    res.status(200).json(notes);
});

const addNote = asyncHandler(async (req, res) => { // POST request. acesso privado. endpoint: /api/tickets/:ticketId/notes
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('Essa anotação não existe');
    }
    const ticket = await Ticket.findById(req.params.ticketId);
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Algo deu errado');
    }
    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    });
    res.status(200).json(note);
});

module.exports = {
    getNotes,
    addNote
};
