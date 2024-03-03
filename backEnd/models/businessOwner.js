const mongoose = require("mongoose")

const businessOwnerSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type:String
    },
    GovernmentId:{
        type:String
    },
    Restaurants:{
        type:Array
    }
})

const BusinessOwner = mongoose.model('business_owner',businessOwnerSchema);
module.exports = BusinessOwner;