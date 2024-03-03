const express = require("express");
const {customerSignUpBodySchema , loginBodySchema} = require("../middlewares/validators/customerValidator");
const {businessOwnerSignUpBodySchema , ownerLoginBodySchema} = require("../middlewares/validators/businessOwnerValidator");
const Customer = require("../models/customer")
const User = require("../models/userRoles");
const Admin = require("../models/admin");
const BusinessOwner = require("../models/businessOwner");
const jwt = require("jsonwebtoken");

async function signup(data){
    console.log("dATA" + data.role)
    try {
        if(data.role=="CUSTOMER" || data.role == "customer"){
            let res = await customerSignUp(data);
            return res;
        }else if(data.role=="BUSINESS_OWNER"){
            let res = await businessOwnerSignUp(data);
            return res;
        }else{
            return {
                httpStatusCode:400,
                success:false,
                message:"Invalid role"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            httpStatusCode:500,
            success:false,
            message:error
        }
    }
}

async function customerSignUp(data){
    try {
        //validating request body
        const validateReq = customerSignUpBodySchema.safeParse(data)
        console.log(validateReq);
        if(!validateReq.success){
            return {
                httpStatusCode:400,
                success:false,
                message:"Validation failed",
                error:validateReq.error?.issues
            }
        }

        //validating duplicate email id
        let findUser = await Customer.findOne({Email:data.email}).catch((e)=>{
            console.log(e);
            throw e;
        })
        if(findUser){
            return {
                httpStatusCode:409,
                success:false,
                message:"User alredy exist with this email",
            }
        }

        let insertObj = {
            FirstName:data.firstName,
            LastName:data.lastName,
            Email:data.email,
            Phone:data.phone,
            Password:data.password
        }

        let newCustomer = await Customer.create(insertObj)
        .catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(newCustomer);
        const userId = newCustomer._id

        //specifying user role
        if(newCustomer){
            console.log(userId);
            await User.create({userId:userId , role:"CUSTOMER"})
            return {
                httpStatusCode:200,
                success:true,
                message:"Customer created successfully",
                data:newCustomer
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function businessOwnerSignUp(data){
    try {
        const validateReq = businessOwnerSignUpBodySchema.safeParse(data)
        console.log(validateReq);
        if(!validateReq.success){
            return {
                httpStatusCode:400,
                success:false,
                message:"Validation failed",
                error:validateReq.error?.issues
            }
        }else if(!data.email || !data.governmentId){
            return {
                httpStatusCode:400,
                success:false,
                message:"Email or GovernmentID required"
            }
        }
        let findUser = await BusinessOwner.findOne({Email:data.email,GovernmentId:data.governmentId}).catch((e)=>{
            console.log(e);
            throw e;
        })
        if(findUser){
            return {
                httpStatusCode:409,
                success:false,
                message:"User alredy exist with this details",
            }
        }
        let insertObj = {
            FirstName:data.firstName,
            LastName:data.lastName,
            Email:data.email,
            Phone:data.phone,
            Password:data.password,
            GovernmentId:data.governmentId
        }

        let newCustomer = await BusinessOwner.create(insertObj)
        .catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(newCustomer);
        const userId = newCustomer._id
        if(newCustomer){
            console.log(userId);
            await User.create({userId:userId , role:"BUSINESS_OWNER"})
            return {
                httpStatusCode:200,
                success:true,
                message:"Business owner created successfully",
                data:newCustomer
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function login(data){
try {
    let res;
    if(data.role=="CUSTOMER"){
        res = await customerLogin(data)
    }else if(data.role=="BUSINESS_OWNER"){
       res = await businessOwnerLogin(data)
    }else{
        return {
            httpStatusCode:400,
            success:false,
            message:"INVALID_ROLE"
        }
    }
    return res;
} catch (error) {
    console.log(error);
    throw error;
}
}

async function customerLogin(data){
    try {
        const validateReq = loginBodySchema.safeParse(data);
        if(!validateReq){
            return {
                httpStatusCode:400,
                success:false,
                error:validateReq.error?.issues
            }
        }
        let user = await Customer.findOne({Email:data.email , Password:data.password}).catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(user)
        if(user && user._id){
            const token = jwt.sign({userId:user._id,role:"CUSTOMER"} , process.env.JWT_SECRET_KEY)
            return {
                httpStatusCode:200,
                success:true,
                message:"Login Successful",
                data:{
                    userId:user._id,
                    token:token
                }
            }
        }else{
            return{
                httpStatusCode:400,
                success:false,
                message:"User not exist with these details"
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

}

async function businessOwnerLogin(data){
    try {
        const validateReq = ownerLoginBodySchema.safeParse(data);
        if(!validateReq){
            return {
                httpStatusCode:400,
                success:false,
                error:validateReq.error?.issues
            }
        }
        console.log(data.email);
        console.log(data.password);
        let user = await BusinessOwner.find({Email:data.email , Password:data.password}).catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(user)
        if(user.length && user[0]._id){
            const token = jwt.sign({userId:user[0]._id,role:"BUSINESS_OWNER"} , process.env.JWT_SECRET_KEY)
            return {
                httpStatusCode:200,
                success:true,
                message:"Login Successful",
                data:{
                    userId:user[0]._id,
                    token:token
                }
            }
        }else{
            return{
                httpStatusCode:400,
                success:false,
                message:"User not exist with these details"
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

async function addAdmin(data){
    try {
        let existingAdmin = await Admin.find({Email:data.email}).catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(existingAdmin)
        if(existingAdmin?.length){
            return {
                httpStatusCode:400,
                success:false,
                message:"Already admin exist with these details"
            }
        }
        let reqObj = {
            FirstName:data.firstName,
            LastName:data.lastName,
            Email:data.email,
            Password:data.password,
            Phone:data.phone
        }
        let response = await Admin.create(reqObj).catch((e)=>{
            console.log(e);
            throw e;
        });
        if(response._id){
            await User.create({userId:response._id, role:"ADMIN"}).catch((e)=>{
                console.log(e);
                throw e;
            })
            return {
                httpStatusCode:200,
                success:true,
                message:"Admin added successfully",
                data:response
            }
        }else{
            return {
                httpStatusCode:200,
                success:false,
                message:"Admin not added",
                data:response
            }
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function adminLogin(data){
    try {
        if(!data.email || !data.password){
            return {
                httpStatusCode:400,
                success:false,
                message:"Incorrect params",
            }
        }
        let response = await Admin.find({Email:data.email , Password:data.password}).catch((e)=>{
            console.log(e);
            throw e;
        });
        if(response?.length){
            const token = jwt.sign({userId:response._id,role:"ADMIN"} , process.env.JWT_SECRET_KEY)
            return {
                httpStatusCode:200,
                success:true,
                message:"Hi , admin!!",
                data:response,
                token:token
            }
        }else{
            return {
                httpStatusCode:404,
                success:false,
                message:"Admin not found",
                data:[]
            }
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    signup,
    login,
    addAdmin,
    adminLogin
}