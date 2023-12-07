const mongose = require('mongoose');

const fotoPerfilSchema = new mongose.Schema({
    _id : String,
    name: String,
    data: Buffer,
    contentType: String
});

const fotoPerfil = mongose.model('fotoPerfil', fotoPerfilSchema, 'FotoPerfil');

module.exports = fotoPerfil;