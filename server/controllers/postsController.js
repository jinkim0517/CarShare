const Post = require('../models/Post.js');
const User = require('../models/User.js');

const createPost = async (req, res) => {
    try {
        const {userId, location, description, picturePath} = req.body;
        const user = await User.findById(userId)
        const newPost = await Post.create({
            userId,
            location: user.location,
            firstName: user.firstname,
            lastName: user.lastname,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            
        })
        const post = await Post.find()
        res.status(201).json(post)

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({userId})
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts
}