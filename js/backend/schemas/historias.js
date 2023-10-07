const mongose = require('mongoose');

const historiasSchema = new mongose.Schema({
    _id: String,
    Nombre_Mascota: String,
    Nombre_Duenno: String,
    Fecha_inicio: Date,
    Diagnostico: String,
    Tratamiento: String,

});

const historias = mongose.model('historias', historiasSchema, 'Historias');

module.exports = historias;