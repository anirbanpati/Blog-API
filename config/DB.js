const mongoose = require('mongoose');
const {DB_URL} = require('./constants');


module.exports.DBconnect = async() =>{
    try{
        await mongoose.connect(DB_URL);
    }
    catch(err){
        console.log(err);
    }
}