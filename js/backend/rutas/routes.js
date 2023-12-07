const { express } = require('express');
const {Router} = require('express');
const router = Router();
const controlador = require('../controller/controlador');
const {check, validationResult} = require('express-validator');
const conexion = require('../database/conexion.js');

// router.post('/conexion', conexion.connect);
// router.post('/desconexion', conexion.disconnect);
router.post('/nuevo', controlador.signup);
router.post('/login', controlador.login);
router.post('/crearmascota', controlador.Crearmascota);
router.post('/crearhistoria',controlador.Crearhistoria);
router.post('/asignarcita',controlador.Asignarcita);
router.post('/fotoPerfil', controlador.FotoPerfil);
router.post('/crearPdf', controlador.crearHistoriaPdf);
router.get("/mascotas",controlador.getmascotas);
router.get('/fotoPerfil/:id', controlador.getFotoPerfil);
router.put('/fotoPerfil/:id', controlador.updateFotoPerfil);
router.delete("/eliminarMascota",controlador.eliminar);


module.exports = router;