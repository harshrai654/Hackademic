const {MongoClient} = require('mongodb'); 
require('dotenv').config();
const client = new MongoClient(process.env.URI , { useNewUrlParser: true, useUnifiedTopology: true });

const DB_SUCCESS_MSG = "Database connection successfull!";

async function connect(){
    try {
        //Connecting to mongoDB 
        await client.connect();
        
        console.log(DB_SUCCESS_MSG);

        return client;

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    connect
}