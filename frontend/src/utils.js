const axios = require("axios");

const utils = {
    fetchBanks: function(){
        axios.get("/api/getBanks").then(response=>{
            console.log(response);
        })
    }
}

export default utils;