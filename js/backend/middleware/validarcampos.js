const {response} = require('express')
const { validationResult}  = require('express-validator');

const validarcampos =(request,Reponse=response,next) => {

    const errores = validationResult(request);

    if (!errores.isEmpty) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        })
    }
    next()
}

module.exports ={

    validarcampos
}