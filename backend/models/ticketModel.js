const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
    // cada ticket estará conectado a um usuário
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // relaciona esse campo ao object id
            required: [true],
            ref: 'User', // relaciona ao collection User
        },
        product: {
            type: String,
            required: [true, 'Por favor, selecione uma categoria'],
            enum: [ // "produtos" específicos que poderão ser enviados
                'Suporte geral do Windows 10 ou 11',
                'Montagem e upgrade de desktop',
                'Análise de telas azuis',
            ],
        },
        description: {
            type: String,
            required: [true, 'Por favor, adicione uma descrição do problema'],
        },
        status: {
            type: String,
            enum: ['novo', 'aberto', 'fechado'],
            default: 'novo',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);
