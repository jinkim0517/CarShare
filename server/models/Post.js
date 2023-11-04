const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        max: 50
    },
    location: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: String,
    picturePath: String,
    userPicturePath: String,

}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema);