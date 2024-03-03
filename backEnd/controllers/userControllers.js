const express =  require("express");
const router = express.Router();
const userService =  require("../services/user");


async function signUp(req,res){
    try {

       await userService.signup(req.body).then((signUpRes)=>{
            console.log("Hello" + signUpRes.success);
            let httpStatusCode = signUpRes.httpStatusCode;
            delete signUpRes.httpStatusCode;
            return res.status(httpStatusCode).json(signUpRes)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function login(req,res,next){
    try {

       await userService.login(req.body).then((loginRes)=>{
            console.log("Hello" + loginRes.success);
            let httpStatusCode = loginRes.httpStatusCode;
            delete loginRes.httpStatusCode;
            return res.status(httpStatusCode).json(loginRes)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addAdmin(req,res,next){
    try {

       await userService.addAdmin(req.body).then((signUpRes)=>{
            console.log("Hello" + signUpRes.success);
            let httpStatusCode = signUpRes.httpStatusCode;
            delete signUpRes.httpStatusCode;
            return res.status(httpStatusCode).json(signUpRes)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function adminLogin(req,res,next){
    try {

       await userService.adminLogin(req.body).then((loginRes)=>{
            let httpStatusCode = loginRes.httpStatusCode;
            delete loginRes.httpStatusCode;
            return res.status(httpStatusCode).json(loginRes)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.signUp = signUp
exports.login = login
exports.addAdmin = addAdmin
exports.adminLogin = adminLogin