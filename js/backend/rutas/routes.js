const { express } = require('express');
const {Router} = require('express');
const router = Router();
const controlador = require('../controller/controlador');
const {check, validationResult} = require('express-validator');
const conexion = require('../database/conexion.js');



router.post('/conexion', conexion.connect);
router.post('/desconexion', conexion.disconnect);
router.post('/nuevo', controlador.signup);
// router.post('/login', controlador.login);
router.post('/crearmascota', controlador.Crearmascota);
router.post('/crearhistoria',controlador.Crearhistoria);


module.exports = router;