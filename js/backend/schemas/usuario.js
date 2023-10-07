const mongose = require('mongoose');

const usuarioSchema = new mongose.Schema({
    usuario: String,
    Email: String,
    password: String
});

const user = mongose.model('usuarios', usuarioSchema, 'usuarios');

module.exports = user;