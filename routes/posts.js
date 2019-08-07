const express = require('express')
const router = express.Router()
const { getPosts, createPost, postByUser, postById, isPoster, deletePost } = require("../controllers/postController")
const { createPostValidator } = require('../validators/index')
const { requireSignIn } = require('../controllers/authController')
const { userById } = require('../controllers/userController')

router.get("/", getPosts)

router.post("/post/new/:userId",
    requireSignIn,
    createPost,
    createPostValidator
)
router.get('/', getPosts)
router.get("/posts/by/:userId", postByUser)
router.delete("/post/:postId",requireSignIn,isPoster,deletePost)
router.param('userId', userById)
router.param('postId', postById)

module.exports = router
