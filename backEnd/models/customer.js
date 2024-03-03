const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
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
    Reviews:{
        type:Array,
        default:[]
    }
})

const Customer = mongoose.model('customers',customerSchema,);
module.exports = Customer