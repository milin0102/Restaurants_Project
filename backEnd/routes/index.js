const express = require("express")
const router = express.Router()

const userRoutes = require("../routes/user")
const restaurantRoutes = require("../routes/restaurant")
const reviewRoutes = require("../routes/reviews")

router.use("/v1/user",userRoutes)
router.use("/v1/restaurant",restaurantRoutes)
router.use("/v1/review",reviewRoutes)

module.exports = router;