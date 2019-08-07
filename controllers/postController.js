const Post = require('../models/postSchema')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const formidable = require('formidable')
const fs = require('fs')

getPosts = (req, res) => {
    Post.find().populate("postedBy", "_id name").select("_id title body").then(posts => {
        res.status(200).json({
            posts: posts
        })

    })
}

createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.type
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
postByUser = (req, res) => {
    console.log(req.profile._id)
    // Post.find().then(posts,err =>{
    //     res.json(posts)
    // })
    Post.find({postedBy : {_id : req.profile._id}}).populate("postedBy", "_id name").sort({created : 1}).then(posts => {
        console.log(posts)
        res.status(200).json({
            posts: posts
        })
    })
}

module.exports = {
    getPosts,
    createPost,
    postByUser
}