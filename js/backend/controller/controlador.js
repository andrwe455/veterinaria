const usuario = require('../schemas/usuario.js');
const mascota = require('../schemas/mascotas.js');

async function signup(req, res) {

    console.log('Solicitud POST recibida en /nuevo');
    try {
        // Crea una instancia del modelo Servicio con los datos enviados en la solicitud
        const nuevousuario = new usuario(req.body);
        // Guarda el nuevo servicio en la base de datos
        const Email = req.body.Email;
        const user = await usuario.findOne({Email});
        try {
            if (user!==null) {
                if (Email === user.Email) {
                    res.status(500).json({error: 'El usuario ya existe'});
                    console.log("El usuario ya existe");
                } else {
                    await nuevousuario.save();
                    return res.status(200).json(nuevousuario);
                }
            }
            else {
                await nuevousuario.save();
                return res.status(200).json(nuevousuario);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Error al crear el servicio'});
        }
        // // Responde con el nuevo servicio creado
    } catch (error) {
        // Maneja los errores, por ejemplo, si la validación falla o si hay un problema con la base de datos
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function login(req, res) {
    const { Email,password }=req.body;

    try {
        const user = await usuario.findOne({Email});
        console.log(user.password);
        if(!user){
            return res.status(404).json({msg:"El usuario no existe"});
        }
        if(user.password !== password){
            return res.status(401).json({msg:"Password incorrecto"});
        }
        if (user.password === password )
        {
            if (user.role === "admin") {
                // res.redirect('../../Admin/index.html');
                console.log("Usuario logeado correctamente");
            }
            return res.status(200).json({msg:"Usuario logeado correctamente"});
        }
    }catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function Crearmascota (req, res) {

    console.log('Solicitud POST recibida en /crearmascota');
    try {
        const nuevaMascota = new mascota(req.body);

        await nuevaMascota.save();
        res.status(201).json(nuevaMascota);
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

module.exports = {
    signup,
    login,
    Crearmascota
}