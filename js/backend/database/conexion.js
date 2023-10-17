const mongoose = require('mongoose');
async function connect (req, res) {
    const { user,password }=req.body;
    try {
        mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.labzm9a.mongodb.net/taller2?retryWrites=true&w=majority`);
        res.status(200).json({msg:"Conexion exitosa"});
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos');
    }
}
async function disconnect (req, res) {
    try {
        mongoose.disconnect();
        res.status(200).json({msg:"Desconexion exitosa"});
        console.log('DB OFFLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de desconectar base de datos');
    }
}

module.exports = {
    connect,
    disconnect
}