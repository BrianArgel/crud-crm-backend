const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: 'agrgea tu nombre'

    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Usuarios', UsuariosSchema)