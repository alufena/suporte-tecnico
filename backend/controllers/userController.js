const asyncHandler = require('express-async-handler'); // middleware; será para o mongoose, que retorna promise; assim, aqui não será usado ".then" e sim async await

const registerUser = asyncHandler(async (req, res) => {
    // rota: /api/users; acesso público
    // console.log(req.body); // req.body é onde vai estar todas informações, precisa criar o "body parser middleware" no "server.js"
    const { name, email, password } = req.body; // certifica das variáveis existirem através de desestruturação
    if (!name || !email || !password) {
        // validação
        // res.status(400).json({ message: 'Todos os campos são obrigatórios' }); // 200 ok, 400 client error (errou alguma informação). será criado um "error handler" adicionado como pedaço de middleware em server.js
        res.status(400);
        throw new Error('Todos os campos são obrigatórios'); // dessa vez, no postman, retorna o express error handler que é uma página html em tags body
    }
    res.send('Rota de cadastro');
});

const loginUser = asyncHandler(async (req, res) => {
    // rota: /api/users/login; acesso público
    res.send('Rota de login');
});

module.exports = {
    registerUser,
    loginUser,
};
