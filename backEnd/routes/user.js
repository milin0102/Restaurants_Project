const express = require("express");
const router = express.Router()
const userController = require("../controllers/userControllers")
const checkRoles = require("../middlewares/rolesAuth");
const jwtAuth = require("../middlewares/jwtauth");



router.post("/signup",userController.signUp)
router.post("/login",userController.login)

//Now here,only an admin can add another Admin , first admin we have added in the system , for checking user role and access calling checkRoles middleware
router.post("/addAdmin",jwtAuth , checkRoles(["ADMIN"]),userController.addAdmin)
router.post("/adminLogin",userController.adminLogin)


module.exports = router