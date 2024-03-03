const express = require("express");
const router = express.Router()
const  restaurantController = require("../controllers/restaurantControllers")
const checkRoles = require("../middlewares/rolesAuth")
const jwtAuth = require("../middlewares/jwtauth")

router.post("/register",jwtAuth,checkRoles(["BUSINESS_OWNER" , "ADMIN"]),restaurantController.register)
router.post("/getRestaurant",jwtAuth, restaurantController.getRestaurants)
router.post("/updateRestaurant", jwtAuth , checkRoles(["BUSINESS_OWNER","ADMIN"]),restaurantController.updateRestaurant)
router.post("/deleteRestaurant",jwtAuth , checkRoles(["ADMIN"]),restaurantController.deleteRestaurant)

module.exports = router