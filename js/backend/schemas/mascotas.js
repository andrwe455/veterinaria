const mongose = require('mongoose');



const mascotasSchema = new mongose.Schema({
    _id: String,
    nombre: String,
    Estado: String,
    Encargado: String,
    Fecha_Ingreso: Date,
    Fecha_Salida: Date,
    Duenno: String
});

const mascotas = mongose.model('mascotas', mascotasSchema, 'Mascotas');

module.exports = mascotas;