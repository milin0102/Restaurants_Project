const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewControllers")
const jwtAuth = require("../middlewares/jwtauth");
const checkRoles = require("../middlewares/rolesAuth")

router.post("/addReview",jwtAuth , checkRoles(["ADMIN","CUSTOMER"]),reviewController.addReview);
router.post("/deleteReview",jwtAuth , checkRoles(["CUSTOMER","ADMIN"]),reviewController.deleteReview);
router.post("/getReviews",jwtAuth , checkRoles(["ADMIN","CUSTOMER" , "BUSINESS_OWNER"]),reviewController.getReviews);
router.post("/addReply",jwtAuth , checkRoles(["BUSINESS_OWNER"]) , reviewController.addReply)

module.exports = router;