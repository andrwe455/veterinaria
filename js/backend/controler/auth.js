const { Response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require ('../modes/usuario');
const { save } = require('debug/src/browser');


const crearusuario = async (request,response = Response) =>
{
    const {email, password} = request.body;
    try {
        let usuario = await (Usuario.findOne({email:email}));
        if (usuario) {
            return response.status(400).json({
                ok:false,
                msg:"Ya existe un usuario asignado a este correo"
            });
        }
        usuario = new Usuario(request.body) //en caso de que no exista
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario,save;
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador',
        });
    }
}
module.exports = {

    crearusuario
}