const express = require("express")
const Review = require("../models/review")
const Restaurant = require("../models/restaurant")
const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

//Adding a review
async function addReview(data){
    try {
        if(!data.restaurantId || !data.userId){
            return {
                httpStatusCode : 200,
                success:false,
                message:"Invalid Params"
            }
            }
            console.log(data.userId)
            //Checking a particular has if already addded review for a particular restaurant to keep reviews authentic
           let findReview = await Review.findOne({UserId:data.userId ,RestaurantId:data.restaurantId}).catch((e)=>{
                console.log(e);
                throw e;
           })
           if(findReview){
            return {
                httpStatusCode:400,
                success:false,
                message:"You have already added review"
            }
           }

           //Creating a review
           let res = await Review.create({Comment : data.comment, Rating : data.rating , UserId:data.userId ,RestaurantId: data.restaurantId}).catch((e)=>{
            console.log(e);
            throw e;
           })
            if(res._id){
                let restaurant = await Restaurant.findOne({_id:data.restaurantId}).catch((e)=>{
                    console.log(e);
                    throw e;
                })
                console.log(restaurant);
                let updatedReviews=[]
                if(restaurant){
                    let averageRating = restaurant.Rating || data.rating;
                    if(restaurant.Reviews?.length>0){
                        //Calculate average rating of any restaurant
                        averageRating = await calculateAverageRating({reviewIds:restaurant.Reviews.concat(res._id) , rating:data.rating})
                        updatedReviews = restaurant.Reviews.concat(res._id)
                    }else{
                        updatedReviews.push(res._id)
                    }
                    await Restaurant.updateOne({_id:data.restaurantId},{Reviews:updatedReviews,Rating:averageRating}).catch((e)=>{
                        console.log(e);
                        throw e;
                    }) 
                }else{
                    return {
                        httpStatusCode:500,
                        success:false,
                        message:"Restaurant not found"
                    }
                }
                return {
                    httpStatusCode:200,
                    success:true,
                    message:"Review added successfully"
                }
            }else{
                return {
                    httpStatusCode:500,
                    success:false,
                    message:"Review not added!!"
                }
            }
            
    } catch (error) {
       console.log(error);
       throw error; 
    }
    
}

//function to calculate average rating of a restaurant
async function calculateAverageRating(data){
    try {
        const reviewIds = data.reviewIds.map((e)=>{
            let id = new ObjectId(e);
            return id;
        })
        let reviews = await Review.find({_id:{$in:reviewIds}}).catch((e)=>{
            console.log(e);
            throw e;
        })
        if(reviews?.length){
            let totalRating=0;
            reviews.map((review)=>{
                console.log(review.Rating)
                totalRating+=review.Rating
                return totalRating;
            });
            let totalReviews = reviews.length
            let averageRating = totalRating/totalReviews
            return averageRating.toFixed(1);
        }else{
            return data.rating;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
 
}

//Delete a review
async function deleteReview(data){
    try {
        console.log(data)
        if(!data.reviewId){
            return {
                httpStatusCode:500,
                success:false,
                message:"Invalid Params"
            }
        }
        let res = await Review.deleteOne({_id:data.reviewId , UserId: data.userId}).catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(res);
        return{
            httpStatusCode:200,
            success:true,
            message:"Review Deleted!!"
        }
        
    } catch (error) {
        
    }
}

//Get all reviews of any restaurant
async function getReviews(data){
    try {
        if(!data.restaurantId){
            return {
                httpStatusCode:500,
                success:false,
                message:"Invalid Params , pass restaurant id"
            }
        }
        let restaurant = await Restaurant.findOne({_id:data.restaurantId}).catch((e)=>{
            console.log(e);
            throw e;
        })

        if(restaurant){
            console.log(restaurant);
            let reviewIds = restaurant.Reviews
            let reviewsArr = []
            console.log(reviewIds)
            if(reviewIds?.length){
                reviewsArr = await Review.find({_id:{ "$in":  reviewIds }}).catch((e)=>{
                    console.log(e);
                    throw e;
                })
                return {
                    httpStatusCode:200,
                    success:true,
                    message:"All reviews fetched",
                    data:reviewsArr
                }   
            }
            return {
                httpStatusCode:404,
                message:false,
                data:[],
                message:"No reviews"
            }
        }else{
            return {
                httpStatusCode: 404,
                success:false,
                message:'No restaurant found',
                data:[]
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//For adding reply for any review
async function addReply(data){
    try {
        if(!data.reviewId){
            return { 
                httpStatusCode:500,
                success:false,
                message:'Pleases send review id '
            }
        }else{
            let updateObj= {
                Reply:data.reply
            }
            let updateRes = await Review.findByIdAndUpdate({_id:data.reviewId},updateObj).catch((e)=>{
                console.log(e);
                throw e;
            })
            return {
                httpStatusCode:200,
                success:true,
                message:"Reply added!"
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.addReview = addReview
exports.deleteReview = deleteReview
exports.getReviews = getReviews
exports.addReply = addReply