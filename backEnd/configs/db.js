const mongoose = require("mongoose")

async function connectToDb(username , password){
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.fzgaw.mongodb.net/restaurant_management_db`).then(()=>{
    console.log("connection established")
}).catch((e)=>{
    console.log("Connection not Established "+e);
    throw e;
})
}

exports.connectToDb = connectToDb;
