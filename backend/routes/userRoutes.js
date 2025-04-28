const express = require('express');
const router = express.Router(); // importa o roteamento de express
const { registerUser, loginUser } = require('../controllers/userController'); // poderia ter a lógica de ter todas funções junto às rota, mas foram substituídas por uma controller function (mais limpo)

// router.post('/', (req, res) => {
//     // post request. req e res são convenções para request e response
//     res.send('Rota de cadastro');
// });

// router.post('/login', (req, res) => {
//     res.send('Rota de login');
// });

router.post('/', registerUser); // http://localhost:5000/api/users/
router.post('/login', loginUser); // http://localhost:5000/api/users/login

module.exports = router;
