const axios = require("axios");

const utils = {
    fetchBanks: function(){
        return axios.get("/api/getBanks").then(response=>response.data);
    },

    fetchAPIkey: function(){
        return axios.get("/api/fetchKey").then(response=>response.data);
    },
    sendOTP : function(mobile){
        return axios.post("/api/sendOTP",{mobile}).then(response => response.data);
    },
    verifyOTP : function(obj){
        console.log(obj)
        return axios.post("/api/verifyOTP",{otp:obj.otp,reqId:obj.reqId}).then(response => response.data);
    },
    verifyAuth: function(){
        return axios.get("/api/auth").then((response)=>response.data);
    }
}

export default utils;