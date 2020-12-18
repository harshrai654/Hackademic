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

const addBank = function(bank,client){
  const db = client.db(constants.names.DB_NAME);
  const bankCollection = db.collection(constants.names.COLLECTION_NAME);

  bankCollection.insertOne(bank,(err,r)=>{
      if(err)
        console.log(err)
      else{
            db.createCollection(bank.name)
            const bankNameCollection = db.collection(bank.name);
            bank.avbl.forEach(date => {
                let temp = new Date(date);
                if(temp.getDay() === 0 || temp.getDay() === 6)return;
                bankNameCollection.insertOne({
                    date,
                    timeSlots:createTimeSlotArray()
                })
            });
          console.log(`${r.insertedCount} Bank added !`)
      }
  })
}

const fetchBanks = function(client){
    const db = client.db(constants.names.DB_NAME);
    const bankCollection = db.collection(constants.names.COLLECTION_NAME);
    return bankCollection.find({});
}

const createTimeSlotArray = function(){
    let slots = [];
    for(let i = 8; i < 16; i++){
        let start = i + 1;
        let end = i + 2;
        slots.push({
            start,
            end,
            alloted : 0
        })
    }
    return slots;
}

module.exports = {
    connect,
    addBank,
    fetchBanks
}