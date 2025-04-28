const express = require('express');
const router = express.Router(); // importa o roteamento de express
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController'); // poderia ter a lógica de ter todas funções junto às rota, mas foram substituídas por uma controller function (mais limpo)

const { protect } = require('../middleware/authMiddleware'); // uso desse midleware ocorre com "protect" como argumento adicional

// router.post('/', (req, res) => {
//     // post request. req e res são convenções para request e response
//     res.send('Rota de cadastro');
// });

// router.post('/login', (req, res) => {
//     res.send('Rota de login');
// });

router.post('/', registerUser); // http://localhost:5000/api/users/
router.post('/login', loginUser); // http://localhost:5000/api/users/login
router.get('/me', protect, getMe); // http://localhost:5000/api/users/me será uma rota protegida a qual o envio de uma request com json web token retornará informações do atual usuário logado

module.exports = router;
