const express = require('express')
const router = express.Router()
const {getPosts,createPost} = require("../controllers/postController")
const validator = require('../validators/index')
const {requireSignIn} = require('../controllers/authController')

router.get("/",requireSignIn,getPosts)

router.post("/post",[validator.createPostValidator], createPost)

module.exports = router
