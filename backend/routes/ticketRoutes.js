const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTickets, createTicket } = require('../controllers/ticketController')

router.route('/').get(protect, getTickets).post(protect, createTicket); // requests encadeados por conta de "router.route". tudo em uma linha só. rota "get" será protegida, ou seja, pegar tickets de usuários precisa estar autenticado. "get" estará conectado à função "getTickets" em ticketController. o mesmo ocorre para "post"

module.exports = router;
