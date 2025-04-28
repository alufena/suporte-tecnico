const registerUser = (req, res) => {
    res.send('Rota de registro');
};

const loginUser = (req, res) => {
    res.send('Rota de cadastro');
};

module.exports = {
    registerUser,
    loginUser,
};
