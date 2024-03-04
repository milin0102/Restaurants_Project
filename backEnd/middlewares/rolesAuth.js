const User = require("../models/userRoles")

//middleware to check roles and access of any functionality for the current user
const checkRoles = (roles)=>{
    return async (req,res,next)=>{
        if(!req.role){
            res.status(403).json({"message":"no user found"})
        }
        console.log(roles)
        console.log(req.role)
        if(roles.includes(req.role)){
            next();
        }else{
            res.status(403).json({"message":"You are not allowed to perform this action"})
        }
    }
}

module.exports = checkRoles;