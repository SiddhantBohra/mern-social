const Post = require('../models/postSchema')
const formidable = require('formidable')
const fs = require('fs')

getPosts = (req, res) => {
    const post = Post.find().then(posts => {
        res.status(200).json({
            posts: posts
        })

    })
}

createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image cannot be uploaded"
            })
        }
        let post = new Post(fields)
        post.postedBy = req.profile
        console.log("CREATE POST: ", post)
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }

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
    })
}

module.exports = {
    getPosts,
    createPost
}