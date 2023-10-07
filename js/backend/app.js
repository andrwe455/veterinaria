const express = require('express');
const mongoose = require('mongoose');
const usuario = require('./schemas/usuario.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configura la conexión a MongoDB Atlas
const mongoURI = 'mongodb+srv://andresgutierrez83111:fO1RwkAfBKaGKFA8@cluster0.labzm9a.mongodb.net/taller2?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a MongoDB Atlas establecida');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB Atlas:', err);
    });

// Rutas de tu API
// Define tus rutas y lógica de negocio aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use(bodyParser.json());
app.use(cors(({ origin: '*' })));
app.use(express.json());
app.use(express.static('public'));

app.post("/nuevo",async (req, res) => {

    console.log('Solicitud POST recibida en /nuevo');
    try {
        // Crea una instancia del modelo Servicio con los datos enviados en la solicitud
        const nuevousuario = new usuario(req.body);
        // Guarda el nuevo servicio en la base de datos
        await nuevousuario.save();
        // Responde con el nuevo servicio creado
        res.status(201).json(nuevousuario);

    } catch (error) {
        // Maneja los errores, por ejemplo, si la validación falla o si hay un problema con la base de datos
        res.status(500).json({error: 'Error al crear el servicio'});
    }
});

app.post("/login",async (req, res) => {

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
            if (user.password === password)
            {
                return res.status(200).json({msg:"Usuario logeado correctamente"});
            }
            res.status(200).json({msg:"Usuario logeado correctamente"});
   }catch (error) {
        res.status(500).json({error: 'Error al crear el servicio'});
   }
});
