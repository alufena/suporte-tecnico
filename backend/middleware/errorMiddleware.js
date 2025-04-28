const errorHandler = (err, req, res, next) => {
    // err de error
    const statusCode = res.statusCode ? res.statusCode : 500; // objeto res tem status code que será o que for definido em "res.status()" no arquivo "userController.js"; 500 server error. caso o usuário não estiver lá, retorna o erro 500
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // envia stack trace. só será enviada se fora de produção
    });
};

module.exports = { errorHandler }