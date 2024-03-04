const express = require("express");
const router = express.Router()
const  restaurantController = require("../controllers/restaurantControllers")
const checkRoles = require("../middlewares/rolesAuth")
const jwtAuth = require("../middlewares/jwtauth")

//Admin and business owners can register restaurants
router.post("/register",jwtAuth,checkRoles(["BUSINESS_OWNER" , "ADMIN"]),restaurantController.register)

//
router.post("/getRestaurant",jwtAuth, restaurantController.getRestaurants)

//Business owners and admin can update restaurants
router.post("/updateRestaurant", jwtAuth , checkRoles(["BUSINESS_OWNER","ADMIN"]),restaurantController.updateRestaurant)

//Only admin can delete a restaurant
router.post("/deleteRestaurant",jwtAuth , checkRoles(["ADMIN"]),restaurantController.deleteRestaurant)

module.exports = router