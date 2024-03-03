const express =  require("express");
const router = express.Router();
const restaurantService =  require("../services/restaurants");


async function register(req,res,next){
    try {
       await restaurantService.addRestaurants({...req.body,userId:req.userId}).then((registerRes)=>{
            console.log("Hello" + registerRes.success);
            let httpStatusCode = registerRes.httpStatusCode;
            delete registerRes.httpStatusCode;
            return res.status(httpStatusCode).json(registerRes)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getRestaurants(req,res,next){
    try {
       await restaurantService.getRestaurants({...req.body,userId:req.userId,role:req.role}).then((restaurants)=>{
            let httpStatusCode = restaurants.httpStatusCode;
            delete restaurants.httpStatusCode;
            return res.status(httpStatusCode).json(restaurants)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateRestaurant(req,res,next){
    try {
       await restaurantService.updateRestaurant({...req.body,userId:req.userId}).then((restaurants)=>{
            let httpStatusCode = restaurants.httpStatusCode;
            delete restaurants.httpStatusCode;
            return res.status(httpStatusCode).json(restaurants)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteRestaurant(req,res,next){
    try {
       await restaurantService.deleteRestaurant({...req.body,userId:req.userId}).then((restaurants)=>{
            let httpStatusCode = restaurants.httpStatusCode;
            delete restaurants.httpStatusCode;
            return res.status(httpStatusCode).json(restaurants)
       })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.register = register
exports.getRestaurants = getRestaurants
exports.updateRestaurant = updateRestaurant
exports.deleteRestaurant = deleteRestaurant