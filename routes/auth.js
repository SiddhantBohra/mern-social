const express = require('express')
const router = express.Router()
const {signup,signin,signout} = require("../controllers/authController")
const {userById} = require("../controllers/userController")
const {userSignupValidator} = require('../validators/index')

router.post("/signup",[userSignupValidator],signup)
router.post("/signin",signin)
router.get('/signout',signout)

router.param('userId',userById)
module.exports = router
