const mongoose = require("mongoose")

const userRolesSchema = mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['ADMIN','CUSTOMER','BUSINESS_OWNER']
    }
})

const userModel = mongoose.model('user_roles',userRolesSchema)
module.exports = userModel