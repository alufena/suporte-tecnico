const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');

router.route('/').get(protect, getTickets).post(protect, createTicket); // requests encadeados por conta de "router.route". tudo em uma linha só. rota "get" será protegida, ou seja, pegar tickets de usuários precisa estar autenticado. "get" estará conectado à função "getTickets" em ticketController. o mesmo ocorre para "post"

router
    .route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket);

module.exports = router;
