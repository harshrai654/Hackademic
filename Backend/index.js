const express = require('express');         //For handling HTTP-requests
const app = express();    
const port = process.env.port || 3000 ;
const db = require("./db");

const client = db.connect().catch(console.error);

// console.log(process.env.URI);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/example', (req, res) => {
    console.log("HIT");
    res.send('Hello World!')
})

app.get("/api/getBanks", (req,res)=>{
  // client.db("qmgm")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})