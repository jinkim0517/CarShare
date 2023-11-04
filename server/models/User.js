const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    picturePath: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    connections: {
        type: Array,
        default: []
    },
    listings: {
        type: Array,
        default: []
    },
    preferences: {
        type: Array,
        default: []
    }

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);