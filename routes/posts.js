const express = require('express')
const router = express.Router()
const postController = require("../controllers/postController")
const validator = require('../validators/index')

router.get("/", postController.getPosts)

router.post("/post",[validator.createPostValidator], postController.createPost)

module.exports = router
