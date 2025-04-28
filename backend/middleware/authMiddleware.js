// aqui será onde protege rotas específicas (envio de tickets)

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    // função protetora de rotas
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // checa token no header; esse token será guardado no frontend react. a maneira que será enviada é "Bearer Token"
        try {
            token = req.headers.authorization.split(' ')[1]; // pega token do header; split(' ') criará o espaço necessário para a formatação como "Bearer Token", criado como array e no índice 1 que pega o item "Token"
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifica token
            req.user = await User.findById(decoded.id).select('-password'); // pega usuário do token. ".select('-password')" exclui a senha do dado retornado do usuário
            next(); // chama o próximo pedaço de middleware
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Algo deu errado');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Algo deu errado');
    }
});

module.exports = { protect }
