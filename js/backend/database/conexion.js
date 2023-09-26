const mongoose = require('mongoose');
const {login}= require("../main");

const dbConnection = async() => {

    const {username,password} =login();
    console.log({username,password});
    try {
        mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.labzm9a.mongodb.net/?retryWrites=true&w=majority`);

        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos');
    }
}

module.exports= {
    dbConnection
}
