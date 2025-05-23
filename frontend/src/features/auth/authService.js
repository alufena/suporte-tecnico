import axios from 'axios'; // poderia ser fetch api no lugar do axios

const API_URL = '/api/users/'; // "/api/users" é o endpoint de autenticação
const register = async (userData) => {
    // registra usuário
    const response = await axios.post(API_URL, userData); // está fazendo as mesmas interações que ocorreram em postman, mas dentro do app. "userData" é o nome, email e senha
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // salva as informações do usuário incluindo o web token json como string
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData); // a concatenação faz acontecer: "api/users/login"
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};


const logout = () => {
    // realiza logout de um usuário
    localStorage.removeItem('user');
};

const authService = {
    register,
    logout,
    login
};

export default authService;
