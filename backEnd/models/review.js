const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    Comment:{
        type:String,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    },
    Reply:{ 
        Type:String
    },
    UserId:mongoose.Schema.Types.ObjectId,
    RestaurantId: mongoose.Schema.Types.ObjectId
   
})

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review