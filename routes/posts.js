const express = require('express')
const router = express.Router()
const {getPosts,createPost} = require("../controllers/postController")
const {createPostValidator} = require('../validators/index')
const {requireSignIn} = require('../controllers/authController')
const {userById} = require('../controllers/userController')

router.get("/",getPosts)

router.post("/post/new/:userId",
requireSignIn,
createPost,
createPostValidator)

router.param('userId',userById)

module.exports = router
