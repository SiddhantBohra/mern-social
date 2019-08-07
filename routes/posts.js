const express = require('express')
const router = express.Router()
const { getPosts, createPost,postByUser } = require("../controllers/postController")
const { createPostValidator } = require('../validators/index')
const { requireSignIn } = require('../controllers/authController')
const { userById } = require('../controllers/userController')

router.get("/", getPosts)

router.post("/post/new/:userId",
    requireSignIn,
    createPost,
    createPostValidator
)
router.get('/',getPosts)
router.get("/posts/by/:userId",postByUser)

router.param('userId', userById)

module.exports = router
  