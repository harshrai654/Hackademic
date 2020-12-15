const {MongoClient} = require('mongodb'); 
require('dotenv').config();
const client = new MongoClient(process.env.URI , { useNewUrlParser: true, useUnifiedTopology: true });

async function connect(){
    try {
        //Connecting to mongoDB 
        await client.connect();

        //listing all dbs just to test connection
        await listDatabases(client);

    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = {
    connect
}