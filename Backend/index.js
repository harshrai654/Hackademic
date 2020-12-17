const express = require('express');         //For handling HTTP-requests
const app = express();    
require("dotenv").config();
const port = process.env.port || 3000 ;
const constants = require("./constants");
const bodyParser = require("body-parser");
const Nexmo = require("nexmo");
const nexmo = new Nexmo({
  apiKey : process.env.OTP_API_KEY,
  apiSecret : process.env.OTP_SECREAT_KEY
});

//DB
const {MongoClient} = require('mongodb'); 
const db = require("./db");
const client = new MongoClient(process.env.URI , { useNewUrlParser: true, useUnifiedTopology: true })


//Session
const session = require("express-session");
const {v4:uuidv4} = require("uuid");
const sessionStore = new session.MemoryStore();

//Middlewares
app.use(session({
  secret : process.env.SESSION_KEY,
  genid : req=>uuidv4(),
  resave: false,
  saveUninitialized : true
}))
app.use(bodyParser.json());

//connecting to DB
db.connect(client).catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/fetchKey",(req,res)=>{
  if(req.session.id){
    console.log(constants.messages.AUTH_SUCC)
    res.send(process.env.MAP_API_KEY)
  }else{
    console.log(constants.messages.AUTH_FAIL);
    res.status(401);
  }
})

app.get("/api/getBanks", (req,res)=>{

  if(req.session.id){
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
  }else{
    console.log(constants.messages.AUTH_FAIL)
    res.status(401);
  } 
    

})

app.post("/api/sendOTP",(req,res)=>{
  if(req.session.id){
    const mobile = req.body.mobile;
    nexmo.verify.request({
      number :  "91" + mobile,
      brand : constants.names.BRAND,
      code_length : "4"
    },(err,result)=>{
      if(err)res.send({status:false});
      else{
        if(result.error_text)res.send({status:false})
        else res.send({status:true,req_id:result.request_id});
        console.log(result);
      }
    })
  }

  //console.log(req.body)
  
})

app.post("/api/verifyOTP",(req,res)=>{
  console.log(req.body)
  if(req.session.id){
    const otp = req.body.otp;
    const reqId = req.body.reqId;

    nexmo.verify.check({
      request_id : reqId,
      code : otp,
    },(err,result)=>{
      console.log(result)
      if(err)res.send({status:false});
      else{
        if(result.error_text)res.send({status:false})
        else res.send({status:true});
        console.log(result);
      }
    })
  }

  //console.log(req.body)
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})