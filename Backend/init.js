const constants = require("./constants");
const db = require("./db");
//Console
const readline = require("readline");
const { Db } = require("mongodb");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createDateArray = function(){
    let date = new Date(), dates=[];
    for(let i = 1; i < 15; i++){
        dates.push(date);
        date = new Date(date.setDate(date.getDate() + 1))
    }
    return dates;
}

module.exports = {
    initDB : function(client){
        rl.question(constants.init.ADD_NEW_BANK, answer=>{
            if(answer === 'y'){
                let bank = {}    
                rl.question(constants.init.BANK_NAME, name=>{
                    bank.name = name;
                    rl.question(constants.init.BANK_LAT, lat=>{
                        bank.lat = lat;
                        rl.question(constants.init.BANK_LNG, lng=>{
                            bank.lng = lng;
                            bank.avbl = createDateArray();
                            db.addBank(bank,client)
                        })
                    })
                })
            }else{
              console.log(constants.init.DEFAULT_LIST);
            }
        })
    }
}