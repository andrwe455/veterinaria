const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://andresgutierrez83111:9ufhaDrfzWUZ9PXe@cluster0.labzm9a.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const db = client.db('taller2');
        const collection = db.collection('Clientes');

        // Realiza operaciones con la base de datos aquí
        // Ejemplo: Insertar un documento
        const documentToInsert = { nombre: 'Ejemplo', edad: 30 , so:'asdasd'};
        const result = await collection.insertOne(documentToInsert);
        console.log(`Documento insertado con _id: ${result.insertedId}`);
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {

        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);