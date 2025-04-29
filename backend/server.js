const express = require('express'); // sintaxe commonjs (module syntax). está trazendo o pacote express para cá (importação)
const dotenv = require('dotenv').config(); // método config; agora pode ir na pasta raiz e criar o arquivo ".env"
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000; // camufla dados sensíveis graças ao "dotenv"; PORT é uma variável criada no arquivo ".env". aqui se pega o valor dessa variável PORT. tenta usar a porta do .env ou a 5000
const colors = require('colors'); // permite o uso do pacote colors em todo projeto
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json()); // cria um pedaço de middleware com ".use"; permite agora enviar raw json
app.use(express.urlencoded({ extended: false })); // middleware que permite enviar x-www-form-urlencoded

app.get('/', (req, res) => {
    // cria uma rota com Express
    // res.send('teste'); // poderia ser "res.json" no lugar de "res.send"
    // res.json({
    //     message: 'teste',
    // });
    // res.status(201).json({ // status 201 cria um novo arquivo
    //     message: 'teste',
    // });
    res.status(200).json({
        message: 'Bem-vindo ao API de Suporte Técnico',
    });
});

// rotas
app.use('/api/users', require('./routes/userRoutes')); // usa o endpoint "/api/users" no arquivo "routes/userRoutes.js"
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use(errorHandler); // quando deixar um campo de cadastro vazio, ao invés de um arquivo html, agora envia de volta um json no postman. mais informações para debugar e não será mostrada em produção


app.listen(PORT, () => console.log(`Servidor iniciou na porta ${PORT}`));
