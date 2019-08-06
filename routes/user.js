const express = require('express')
const router = express.Router()
const {signup,signin,signout,requireSignIn} = require("../controllers/authController")
const {userById,allUsers,getUser} = require("../controllers/userController")

router.get("/users", allUsers)
router.get('/user/:userId',requireSignIn,getUser)
router.param('userId', userById)

module.exports = router
