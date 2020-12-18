const express = require('express');         //For handling HTTP-requests
const app = express();    
const port = process.env.port || 3000 ;
const db = require("./db");

db.connect().catch(console.error);

// console.log(process.env.URI);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})