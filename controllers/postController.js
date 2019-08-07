const Post = require('../models/postSchema')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

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
    Post.find({ postedBy: { _id: req.profile._id } }).populate("postedBy", "_id name").sort({ created: 1 }).then(posts => {
        console.log(posts)
        res.status(200).json({
            posts: posts
        })
    })
}
const postById = (req, res, next, id) => {
    Post.findById(id).populate("postedBy", "_id name").then(posts => {
        req.post = posts
      //  console.log(req.post)
        next();
    })
}
const isPoster = (req, res, next) => {
    let poster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    console.log(poster)
    if (!poster) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next();
}
const deletePost = (req, res) => {
    let post = req.post
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        else {
            res.json({
                message: "Post Deleted Successfully"
            })
        }
    })
}
const updatePost = (req , res) => {
    let post = req.post
    post = _.extend(post , req.body)
    post.updated = Date.now()
    post.save().then(post =>{
        res.json(post);
    }).catch(error =>{
        res.status(400).json({
            error : err
        })
    })
}


module.exports = {
    getPosts,
    createPost,
    postByUser,
    postById,
    isPoster,
    deletePost,
    updatePost
}