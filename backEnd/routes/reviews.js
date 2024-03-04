const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewControllers")
const jwtAuth = require("../middlewares/jwtauth");
const checkRoles = require("../middlewares/rolesAuth")


//Admin and customers can add review for a restaurant
router.post("/addReview",jwtAuth , checkRoles(["ADMIN","CUSTOMER"]),reviewController.addReview);

//Delete any review access to only customer and admin
router.post("/deleteReview",jwtAuth , checkRoles(["CUSTOMER","ADMIN"]),reviewController.deleteReview);

//Get reviews for particular restaurant
router.post("/getReviews",jwtAuth , checkRoles(["ADMIN","CUSTOMER" , "BUSINESS_OWNER"]),reviewController.getReviews);

//Also business owners can add reply for any review
router.post("/addReply",jwtAuth , checkRoles(["BUSINESS_OWNER"]) , reviewController.addReply)

module.exports = router;