const express = require("express");
const router = express.Router()
const userController = require("../controllers/userControllers")
const checkRoles = require("../middlewares/rolesAuth");
const jwtAuth = require("../middlewares/jwtauth");

router.post("/signup",userController.signUp)
router.post("/login",userController.login)
router.post("/addAdmin",jwtAuth , checkRoles(["ADMIN"]),userController.addAdmin)
router.post("/adminLogin",userController.adminLogin)
// router.use("/restaurant",restaurantController)
// router.use("/review",reviewControllers)

module.exports = router