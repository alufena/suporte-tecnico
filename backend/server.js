const express = require('express'); // sintaxe commonjs (module syntax). está trazendo o pacote express para cá (importação)
const dotenv = require('dotenv').config(); // método config; agora pode ir na pasta raiz e criar o arquivo ".env"
const PORT = process.env.PORT || 5000; // camufla dados sensíveis graças ao "dotenv"; PORT é uma variável criada no arquivo ".env". aqui se pega o valor dessa variável PORT. tenta usar a porta do .env ou a 5000

const app = express();

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
        message: 'Bem-vindo à API de Suporte Técnico',
    });
});

app.listen(PORT, () => console.log(`Servidor iniciou na porta ${PORT}`));
