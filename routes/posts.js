const express = require('express')
const router = express.Router()
const {getPosts,createPost} = require("../controllers/postController")
const validator = require('../validators/index')

router.get("/", getPosts)

router.post("/post",[validator.createPostValidator], createPost)

module.exports = router
