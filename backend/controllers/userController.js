const asyncHandler = require('express-async-handler'); // middleware; será para o mongoose, que retorna promise; assim, aqui não será usado ".then" e sim async await
const bcrypt = require('bcryptjs'); // serve para fazer hash na senha
const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // jsonwebtoken (JWT) é a chave para acessar conteúdos futuros quando o usuário estiver autenticado; isso será guardado no frontend junto com react

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
    const userExists = await User.findOne({ email }); // continuação caso esteja tudo preenchido. aqui, vai procurar se usuário já existe. método findOne() vem do model User: vai procurar um documento/item. email sozinho é o mesmo que email: email
    if (userExists) {
        res.status(400); // erro cliente
        throw new Error('Esse usuário já existe');
    }
    const salt = await bcrypt.genSalt(10); // faz hash na senha. 10 rounds são passados
    const hashedPassword = await bcrypt.hash(password, salt); // await porque as funções retornam promise
    const user = await User.create({
        // cria o usuário
        name,
        email,
        password: hashedPassword, // sem hashedPassword, a senha ficaria apenas em texto plano
    });
    if (user) {
        res.status(201).json({
            // OK. checagem do usuário criado, se OK, envia de volta
            _id: user._id, // "_" porque é a forma que mongodb lida com ids
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // função separada que assina o token; ela precisa necessariamente do id passado
        });
    } else {
        res.status(400);
        throw new Error('Algo deu errado');
    }
    // res.send('Rota de cadastro'); // removido propositalmente
});

const loginUser = asyncHandler(async (req, res) => {
    // rota: /api/users/login; acesso público
    const { email, password } = req.body; // pega os dados da body enviados
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        // se usuário é encontrado e a senha coincide... compara a senha em "texto plano" com a senha hash usando o método compare do pacote bcrypt
        res.status(200).json({
            // não será 201 porque não está criando nada
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // precisa também estar no login
        });
    } else {
        res.status(401); // erro, não autorizado
        throw new Error('Algo deu errado');
    }
    // res.send('Rota de login');
});

const getMe = asyncHandler(async (req, res) => {
    // pega usuário logado. rota: /api/users/me; acesso privado
    // res.send('me');
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    // res.status(200).json(req.user); // authMiddleware permite agora o acesso ao "req.user"
    res.status(200).json(user); // versão desestruturada que pega campos específicos
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        // jwt requer um "secret" guarda no .env e passado como argumento pelo método sign()
        expiresIn: '30d', // token expira em 30 dias. agora ao registrar ou logar gera um token de volta
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
