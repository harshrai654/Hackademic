const express = require('express');         //For handling HTTP-requests
const app = express();    
const port = process.env.port || 3000 ;
const db = require("./db");

const DB_NAME = "qmgm";

const client = db.connect().catch(console.error);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/example', (req, res) => {
    console.log("HIT");
    res.send('Hello World!')
})

app.get("/api/getBanks", (req,res)=>{
  const db = client.db(DB_NAME);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})