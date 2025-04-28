const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // onde será feito a conexão; pega a uri de .env
        console.log(`MongoDB connectado ${conn.connection.host}`.cyan.underline); // ".cyan.underline" vem do pacote colors
    } catch (error) {
        console.log(`Erro ${error.message}`.red.underline.bold);
        process.exit(1); // fecha todo o processo caso haja falha
    }
};

module.exports = connectDB;
