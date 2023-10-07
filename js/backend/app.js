const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configura la conexión a MongoDB Atlas
const conexion = require('./database/conexion.js');
conexion.connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//parseo del body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(({ origin: '*' })));
app.use(express.json());
app.use(express.static('public'));

// Rutas de tu API
const router =require('./rutas/routes.js');
app.use('/', router);
