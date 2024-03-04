const express = require("express");
const {registerRestaurantSchema} = require("../middlewares/validators/restaurantValidator")
const Restaurant = require("../models/restaurant")
const BusinessOwner = require("../models/businessOwner");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb")


//Adding restaurants
async function addRestaurants(data){
    try {
    //Validate the request body
     const validateReq = registerRestaurantSchema.safeParse(data);
     if(!validateReq.success){
        return {
            httpStatusCode:403,
            message:"Invalid params",
            success:false,
            error:validateReq?.error?.issues
        }
     }

     if(!data.userId){
        return {
            httpStatusCode:403,
            message:"Can't able to find user id",
            success:false,
        }
     }

     //Email id is a primary identifier
     let findRestaurant = await Restaurant.find({Email:data.email}).catch((e)=>{
        console.log(e);
        throw e;
     });
     if(findRestaurant?.length){
        return {
            httpStatusCode:400,
            success:false,
            message:"Restaurant already register with this email"
        }
     }

     let restaurantObj = {
        Name:data.name,
        Email:data.email,
        Phone:data.phone,
        Address:data.address,
        Country:data.country,
        Dishes:data.dishes || [],
        Zipcode:data.zipcode,
        Active:true
     }
     
     let responseObj = await Restaurant.create(restaurantObj).catch((e)=>{
        console.log(e);
        throw e;
     });

    if(responseObj._id){
        let ownerDetails = await BusinessOwner.findOne({_id:data.userId}).catch((e)=>{
            console.log(e);
            throw e;
         });
        
         //Linking Restaurant id to particular business owner
        if(ownerDetails){
            let restaurants = ownerDetails.Restaurants;
            restaurants.push(responseObj._id);
            await BusinessOwner.updateOne({_id:data.userId},{Restaurants:restaurants}).catch((e)=>{
                console.log(e);
                throw e;
             });
        }
        return {
            httpStatusCode:200,
            success:true,
            data:{
                RestaurantId: responseObj._id
            },
            message:"Restaurant added successfully"
        }      
    }else{
        return {
            httpStatusCode:500,
            success:false,
            data:{},
            message:"Failed to add restaurant"
        }  
    }     
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//Business owner can only see their restaurants
async function getRestaurants(data){
   try {
    if(data.role=="BUSINESS_OWNER" && !data.userId){
        return {
            httpStatusCode:400,
            success:false,
            message:"Can't get the owner id"
        }
    }else if(data.role=="BUSINESS_OWNER" && data.userId){
        let businessOwner = await BusinessOwner.findOne({_id:data.userId}).catch((e)=>{
            console.log(e);
            throw e;
        })
        let restaurants = []
        console.log(businessOwner);
        if(businessOwner.Restaurants?.length){
            let restaurantObjectIds = businessOwner.Restaurants.map(function (id){
                let nid = new ObjectId(id)
                return nid;
            })
            console.log(restaurantObjectIds);
            restaurants = await Restaurant.find({_id:{"$in":restaurantObjectIds},Active:true},).catch((e)=>{
                console.log(e);
                throw e;
            });
        }
        return {
            httpStatusCode:200,
            success:true,
            data:restaurants
        }

    }else if(data.role=="ADMIN" || data.role=="CUSTOMER"){
        //Admin and customers can see all restaurants after login
        let restaurants = await Restaurant.find({Active:true}).catch((e)=>{
            console.log(e);
            throw e;
        })
        return {
            httpStatusCode:200,
            success:true,
            data:restaurants
        }
    }else{
        return {
            httpStatusCode:400,
            success:false,
            message:"Role is not specified"
        }
    }
   } catch (error) {
    console.log(error);
    throw error;
   } 
}

//Update Restaunrant
async function updateRestaurant(data){
    try {
        if(!data.restaurantId){
            return {
                httpStatusCode:400,
                success:false,
                message:"RestaurantId is required"
            }
        } 
        let restaurant = await Restaurant.find({_id:data.restaurantId , Active:true}).catch((e)=>{
            console.log(e);
            throw e;
        })
        if(!restaurant.length){
            return {
                httpStatusCode:404,
                success:false,
                data:[],
                message:"No active restaurant found!!"
            }
        }
        let updateObj = {} 
        if(data.name){
            updateObj.Name = data.Name;
        } 
        if(data.email) {
            updateObj.Email = data.email
        }
        if(data.phone){
            updateObj.Phone = data.phone
        }
        if(data?.dishes){
            let currDishes = restaurant[0]?.Dishes
            updateObj.Dishes = currDishes.concat(data.dishes)
        }
        if(data.address){
            updateObj.Address = restaurant[0].Address
            console.log("Updates:" + updateObj.Address)
            if(data.address.AddressLine1) updateObj.Address.AddressLine1 = data.address.AddressLine1;
            if(data.address.City) updateObj.Address.City = data.address.City;
            if(data.address.Zipcode) updateObj.Address.Zipcode = data.address.Zipcode;
        }
        if(data.Country){
            updateObj.Country = data.Country
        }
        let updateRes = await Restaurant.updateOne({_id:data.restaurantId},updateObj).catch((e)=>{
            console.log(e);
            throw e;
        })
        return {
            httpStatusCode:200,
            success:true,
            message:updateRes?.modifiedCount > 0 ? "Restaurant details updated" : "Not updated"
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}


//Not deleting it , but making active flag to false
async function deleteRestaurant(data){
    try {
        if(!data.restaurantId){
            return{
                httpStatusCode:500,
                success:false,
                message:"Restaurant id is missing"
            }
        }
        let deleteRes = await Restaurant.updateOne({_id:data.restaurantId},{Active:false}).catch((e)=>{
            console.log(e);
            throw e;
        })
        return {
            httpStatusCode:500,
            success: true,
            message:"Restaurant Deleted!!"
        }
    } catch (error) {
       console.log(error);
       throw error; 
    }
}

exports.addRestaurants = addRestaurants;
exports.getRestaurants = getRestaurants;
exports.updateRestaurant = updateRestaurant;
exports.deleteRestaurant = deleteRestaurant;