const express = require("express")
const reviewService = require("../services/review")
async function addReview(req,res,next){
    try {
        await reviewService.addReview({...req.body,userId:req.userId}).then((reviewRes)=>{
             let httpStatusCode = reviewRes.httpStatusCode;
             delete reviewRes.httpStatusCode;
             return res.status(httpStatusCode).json(reviewRes)
        })
     } catch (error) {
         console.log(error);
         throw error;
     }
}

async function getReviews(req,res,next){
    try {
        await reviewService.getReviews({...req.body}).then((reviewRes)=>{
             let httpStatusCode = reviewRes.httpStatusCode;
             delete reviewRes.httpStatusCode;
             return res.status(httpStatusCode).json(reviewRes)
        })
     } catch (error) {
         console.log(error);
         throw error;
     }
}


async function deleteReview(req,res,next){
    try {
        await reviewService.deleteReview({...req.body ,userId:req.userId}).then((reviewRes)=>{
             let httpStatusCode = reviewRes.httpStatusCode;
             delete reviewRes.httpStatusCode;
             return res.status(httpStatusCode).json(reviewRes)
        })
     } catch (error) {
         console.log(error);
         throw error;
     }
}

async function addReply(req,res,next){
    try {
        await reviewService.addReply({...req.body}).then((replyRes)=>{
             let httpStatusCode = replyRes.httpStatusCode;
             delete replyRes.httpStatusCode;
             return res.status(httpStatusCode).json(replyRes)
        })
     } catch (error) {
         console.log(error);
         throw error;
     }
}


exports.addReview = addReview
exports.deleteReview = deleteReview
exports.getReviews = getReviews
exports.addReply = addReply