// models são schemas compostos pelos campos que estarão presentes na página de usuário

const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Por favor, adicione um nome'], // poderia ser só true
        },
        email: {
            type: String,
            required: [true, 'Por favor, adicione um e-mail'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Por favor, adicione uma senha'],
        },
        isAdmin: {
            // não será usado no frontend (ui), mas em caso dos usuários quererem ser admin para fazer certas coisas...
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true, // não está em seu próprio campo; após o objeto schema vem timestamps; adiciona marcações de tempo automáticas
    }
);

module.exports = mongoose.model('User', userSchema);
