const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const connectDB = require('./config/db');
const path = require('path');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas da API
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use(errorHandler);

// Configuração de Produção (Render)
if (process.env.NODE_ENV === 'production') {
    // 1. Servir arquivos estáticos do frontend
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // 2. Capturar todas as rotas não-API e redirecionar para o frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
} else {
    // Rota padrão para desenvolvimento
    app.get('/', (req, res) => {
        res.json({
            message: 'API rodando em modo desenvolvimento'
        });
    });
}

app.listen(PORT, () => console.log(`Servidor iniciou na porta ${PORT}`.yellow.bold));