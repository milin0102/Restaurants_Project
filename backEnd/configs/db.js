const mongoose = require("mongoose")

async function connectToDb(){
    await mongoose.connect('mongodb+srv://milin0102:milin%40123@cluster0.fzgaw.mongodb.net/restaurant_management_db').then(()=>{
    console.log("connection established")
}).catch((e)=>{
    console.log("Connection not Established "+e);
    throw e;
})
}

exports.connectToDb = connectToDb;
