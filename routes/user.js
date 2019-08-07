const express = require('express')
const router = express.Router()
const {signup,signin,signout,requireSignIn} = require("../controllers/authController")
const {userById,allUsers,getUser,updateUser,deleteUser,hasAuthorization} = require("../controllers/userController")

router.get("/users", allUsers)
router.get('/user/:userId',requireSignIn,getUser)
router.put('/user/:userId',requireSignIn,updateUser)
router.delete("/user/:userId",requireSignIn,deleteUser)
router.param('userId', userById)

module.exports = router
