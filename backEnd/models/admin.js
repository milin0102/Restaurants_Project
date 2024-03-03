const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
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
    }
})

const Admin = mongoose.model('admin',adminSchema,);
module.exports = Admin