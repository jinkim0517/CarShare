const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userId: String,
    picturePath: String,
    userPicturePath: String,
})


module.exports = mongoose.model('Listing', listingSchema)