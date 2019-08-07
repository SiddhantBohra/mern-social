const express = require('express')
const router = express.Router()
const { getPosts, createPost, postByUser, postById, isPoster, deletePost,updatePost } = require("../controllers/postController")
const { createPostValidator } = require('../validators/index')
const { requireSignIn } = require('../controllers/authController')
const { userById } = require('../controllers/userController')

router.get("/posts", getPosts)

router.post("/post/new/:userId",
    requireSignIn,
    createPost,
    createPostValidator
)
router.get("/posts/by/:userId", postByUser)
router.delete("/post/:postId",requireSignIn,isPoster,deletePost)
router.put("/post/:postId",requireSignIn,isPoster,updatePost)

router.param('userId', userById)
router.param('postId', postById)

module.exports = router
