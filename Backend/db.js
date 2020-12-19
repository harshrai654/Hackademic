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
            const bankNameCollection = db.collection(bank.lat + bank.lng);
            bankNameCollection.insertOne({capacity:bank.cap})
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

const fetchBankData = function(bank,client,callBack){
    const latlng = bank.lat.concat(bank.lng);
    const date = new Date(bank.date);

    console.log(latlng,date)

    const db = client.db(constants.names.DB_NAME);
    const bankCollection = db.collection(latlng);
    bankCollection.find({date}).toArray(function(err,docs){
        if(err)console.log(err)
        else{
            
            callBack(docs)
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
            alloted : 0,
            alotee:[]
        })
    }
    return slots;
}

const bookSlot = function(client,slot){
    console.log(slot)
    const db = client.db(constants.names.DB_NAME);
    const bankCollection = db.collection(slot.collectionName);

    bankCollection.updateOne(
        {date:new Date(slot.date)},
        {$push:
            {alotee:
                {reqId:slot.reqId,mobile:slot.mobile}
            },
        },
        {$inc:
            {
                alloted:1
            }
        },
        function(err,res){
            if(err)console.log(err);
            else {
                console.log(res)
            }
        }
    )
}

module.exports = {
    connect,
    addBank,
    fetchBanks,
    fetchBankData,
    bookSlot
}