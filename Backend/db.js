require('dotenv').config();
const constants = require("./constants");

async function connect(client){
    try {
        //Connecting to mongoDB 
        await client.connect();
        
        console.log(constants.messages.DB_SUCCESS);

        return client;

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    connect
}