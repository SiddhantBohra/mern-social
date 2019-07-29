const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is Required",
        minLength: 4,
        maxLength: 150
    },
    body: {
        type: String,
        required: "Body is Required",
        minLength: 4,
        maxLength: 2000
    }
})

module.exports = mongoose.model("post",postSchema)