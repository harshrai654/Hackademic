const axios = require("axios");

const utils = {
    fetchBanks: function(){
        return axios.get("/api/getBanks").then(response=>response.data);
    },

    fetchAPIkey: function(){
        return axios.get("/api/fetchKey").then(response=>response.data);
    }
}

export default utils;