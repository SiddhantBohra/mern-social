const express = require('express')
const router = express.Router()
const {signup,signin,signout,requireSignIn} = require("../controllers/authController")
const {userById,allUsers,getUser,updateUser} = require("../controllers/userController")

router.get("/users", allUsers)
router.get('/user/:userId',requireSignIn,getUser)
router.put('/user/:userId',requireSignIn,updateUser)
router.param('userId', userById)

module.exports = router
