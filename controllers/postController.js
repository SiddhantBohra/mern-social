const Post = require('../models/postSchema')

getPosts = (req, res) => {
    res.json({
        posts: [{ title: "First Post" }, { title: "Second Post" }]
    })
}

createPost = (req, res) => {
    const post = new Post(req.body);
    console.log("CREATE POST: ", post)
    post.save().then( (result, error) => {
        if (error) {
            res.status(400).json({
                error
            })
        }
        else
        {
            res.status(200).json({
                message : "Success",
                post : result
            })
        }
    })
}

    module.exports = {
        getPosts,
        createPost
    }