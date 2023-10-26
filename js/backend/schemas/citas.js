const mongose = require('mongoose');


const citasSchema = new mongose.Schema({
    _id: String,
    Nombre_Mascota: String,
    Nombre_Duenno: String,
    Fecha: Date,
    Hora: String,
    Motivo: String
});

const citas = mongose.model('citas', citasSchema, 'Citas');

module.exports = citas;


