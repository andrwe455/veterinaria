const mongoose = require('mongoose');


async function connect () {

    try {
        mongoose.connect(`mongodb+srv://andresgutierrez83111:fO1RwkAfBKaGKFA8@cluster0.labzm9a.mongodb.net/taller2?retryWrites=true&w=majority`);
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos');
    }
}

module.exports = {
    connect
}