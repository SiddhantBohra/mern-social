const Post = require('../models/postSchema')

getPosts = (req, res) => {
    const post = Post.find().then(posts => {
        res.status(200).json({
            posts: posts
        })

    })
}

createPost = (req, res) => {
    const post = new Post(req.body);
    console.log("CREATE POST: ", post)
        post.save().then((result, error) => {
            res.status(200).json({
                message: "Success",
                post: result
            })
            if (error) {
                res.status(400).json({
                    error
                })
            }
        })
}

module.exports = {
    getPosts,
    createPost
}