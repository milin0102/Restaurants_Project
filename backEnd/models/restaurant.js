const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    AddressLine1:{
        type:String
    },
    AddressLine2:{
        type:String
    },
    Landmark:{
        type:String
    },
    City:{
        type:String,
        required:true
    },
    Zipcode:{
        type:String,
        required:true
    },
    Lat:mongoose.Schema.Types.Decimal128,
    Lng:mongoose.Schema.Types.Decimal128
})

const restaurantSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String
    },
    Dishes:{
        type:Array,
        default:[]
    },
    Phone:{
        type:Number,
        required:true
    },
    Address:{
        type:addressSchema,
        required:true
    },
    Country:{
        type:String , 
        required:true
    },
    Reviews:{
       type:Array,
       default:[] 
    },
    Active : {
        type:Boolean,
        default:true
    },
    Rating:{
        type:mongoose.Schema.Types.Decimal128
    }
})

module.exports =  mongoose.model('Restaurant',restaurantSchema)