const express = require('express');         //For handling HTTP-requests
const app = express();    
const port = process.env.port || 3000 ;
const constants = require("./constants");

//DB
const {MongoClient} = require('mongodb'); 
const db = require("./db");
const client = new MongoClient(process.env.URI , { useNewUrlParser: true, useUnifiedTopology: true })


//connecting to DB
db.connect(client).catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/example', (req, res) => {
    console.log("HIT");
    res.send('Hello World!')
})

app.get("/api/getBanks", (req,res)=>{

  //console.log(client)
  const db = client.db(constants.names.DB_NAME);
  const bankCollection = db.collection(constants.names.COLLECTION_NAME);

  bankCollection.find({}).toArray((err,docs)=>{
    if(err){
      console.log(constants.messages.BANK_DOC_FAIL)
    }else{
      console.log(constants.messages.BANKS_REQ)
      res.json(docs)
    }
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})