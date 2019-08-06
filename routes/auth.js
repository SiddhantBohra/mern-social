const express = require('express')
const router = express.Router()
const {signup,signin} = require("../controllers/authController")
const {userSignupValidator} = require('../validators/index')

router.post("/signup",[userSignupValidator],signup)
router.post("/signin",signin)
module.exports = router
