const { Router } = require('express');
const {check} = require('express-validator');
const { validarcampos } = require('../middleware/validarcampos');
const {crearusuario}= require("../controler/auth");
const router = Router();
// Crear un nuevo usuario
router.post("/nuevo",
    [
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarcampos
    ]
    ,crearusuario);

router.get(
    [
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
    ]
);
module.exports = router;

