const usuario = require('../schemas/usuario.js');
const mascota = require('../schemas/mascotas.js');
const historias = require('../schemas/historias.js');
const cita = require('../schemas/citas.js');
const fotoPerfil = require('../schemas/fotoPerfil.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer().single('fotoPerfil');
const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
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
                console.log(nuevousuario);
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
        if(!user){
            return res.status(404).json({msg:"El usuario no existe"});
        }
        if(user.password !== password){
            return res.status(401).json({msg:"Password incorrecto"});
        }
        if (user.password === password )
        {
            
            console.log("Usuario logeado correctamente");
            const userToSendToFrontend = {
                _id: user._id,
                email: user.Email,
                role: user.role,
                username: user.usuario,
                // Add other properties you want to send to the front-end
            };
            return res.status(200).json({msg:"Usuario logeado correctamente", user: userToSendToFrontend});


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
async function Crearhistoria (req, res) {

    console.log('Solicitud POST recibida en /crearhistoria');
    try {
        const nuevaHistoria = new historias(req.body);

        await nuevaHistoria.save();
        res.status(201).json(nuevaHistoria);
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function getmascotas (req,res) {
    console.log('Solicitud GET recibida en /mascotas');
    try {
        const mascotas = await mascota.find();
        // res.json(mascotas);
        return res.json(mascotas);
        // return mascotas;
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function eliminar (req,res) {
    console.log('Solicitud DELETE recibida en /eliminarMascota');

    try {
        const id = req.body;
        console.log(id);
        await mascota.deleteOne({_id:id});
        res.status(200).json({msg:"Mascota eliminada correctamente"});
    } catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function Asignarcita (req,res) {

    console.log('Solicitud POST recibida en /asignarcita');
    try {
        const nuevaCita = new cita(req.body);
        await nuevaCita.save();
        res.status(201).json(nuevaCita);
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function FotoPerfil(req, res) {
    console.log('Solicitud POST recibida en /fotoPerfil');
    
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({error: 'Error al subir la foto'});
        }

        const nuevaFoto = new fotoPerfil({
            _id: req.body._id,
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype
        });

        nuevaFoto.save()
            .then(() => {
                res.status(201).json({status: 'success'});
            })
            .catch(error => {
                res.status(500).json({error: 'Error al guardar la foto en la base de datos'});
            });
    });
}

async function getFotoPerfil(req, res) {
    console.log('Solicitud GET recibida en /fotoPerfil');
    try {
        const id = req.params.id; // Suponiendo que estás pasando el ID de la foto como parámetro en la URL
        const foto = await fotoPerfil.find();
        foto.forEach(foto => {
            if (foto._id == id) {
                console.log(foto.id);
                res.setHeader('Content-Type', foto.contentType);
                res.send(foto.data);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la foto de perfil' });
    }
}

async function updateFotoPerfil(req, res) {
    console.log('Solicitud PUT recibida en /fotoPerfil');
    try {
        const id = req.params.id; // Suponiendo que estás pasando el ID de la foto como parámetro en la URL
        const foto = await fotoPerfil.find();
        var fotoToUpdate;
        foto.forEach(foto => {
            if (foto._id == id) {
                fotoToUpdate = foto;
            }
        });
        upload(req, res, function (err) {
            if (err) {
                return res.status(500).json({error: 'Error al subir la foto'});
            }

            fotoToUpdate.name = req.file.originalname;
            fotoToUpdate.data = req.file.buffer;
            fotoToUpdate.contentType = req.file.mimetype;

            fotoToUpdate.save()
                .then(() => {
                    res.status(201).json({status: 'success'});
                })
                .catch(error => {
                    res.status(500).json({error: 'Error al guardar la foto en la base de datos'});
                });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la foto de perfil' });
    }
}

async function getHistorias(req,res) {
    console.log('Solicitud GET recibida en /historias');
    try {
        const historias = await historias.find();
        // res.json(mascotas);
        return res.json(historias);
        // return mascotas;
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

async function crearHistoriaPdf (req,res) {
    console.log('Solicitud GET recibida en /crearpdf');
    const ID = req.body._id;
    const chunks = [];
    try {
        const Clinica = await historias.find();

        Clinica.forEach(historia => {
            
            if (historia._id == ID) {
                console.log(historia._id);
                const doc = new PDFDocument();
                doc.pipe(fs.createWriteStream('output.pdf'));

                doc.text('Historia Clinica', 100, 50);
                doc.fontSize(18).text('Información del Documento', { align: 'center' }).moveDown();

                const table = {
                    headers: ['Campo', 'Valor'],
                    rows: [
                        ['Nombre Mascota', historia.Nombre_Mascota],
                        ['Nombre Dueño', historia.Nombre_Duenno],
                        ['Especie', historia.especie],
                        ['Raza', historia.raza],
                        ['Sexo', historia.sexo],
                        // Añade más filas según la estructura de tu documento
                    ],
                };

                doc.text(table.headers.join(' | '));
                doc.text('_______________________________________________________________________________________________');
                doc.moveDown();
                doc.text(table.rows.map(row => row.join(' | ')).join('\n'));
                doc.moveDown();
                doc.text('_______________________________________________________________________________________________');
                doc.moveDown();
                doc.text('Motivo de la consulta: ' + historia.motivoConsulta);               

                doc.on('data', chunk => chunks.push(chunk));
                doc.on('end', () => {
                    const result = Buffer.concat(chunks);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
                    res.send(result);

                });
                doc.end();
            }
        });
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
    }
}

module.exports = {
    signup,
    login,
    Crearmascota,
    Crearhistoria,
    getmascotas,
    eliminar,
    Asignarcita,
    FotoPerfil,
    getFotoPerfil,
    updateFotoPerfil,
    getHistorias,
    crearHistoriaPdf
}