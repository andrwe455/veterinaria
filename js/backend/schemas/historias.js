const mongose = require('mongoose');

const historiasSchema = new mongose.Schema({
    Nombre_mascota: String,
    Nombre_Duenno: String,
    especie: String,
    raza: String,
    sexo: String,
    peso: String,
    fechaNacimiento: String,
    motivoConsulta: String,
    Diagnostico: String,
    Tratamiento: String,
    veterinario: String
});

const historias = mongose.model('historias', historiasSchema, 'Historias');

module.exports = historias;