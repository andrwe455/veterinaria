const { express } = require('express');
const {Router} = require('express');
const router = Router();
const controlador = require('../controller/controlador');




router.post('/nuevo', controlador.signup);
router.post('/login', controlador.login);
router.post('/crearmascota', controlador.Crearmascota);


module.exports = router;