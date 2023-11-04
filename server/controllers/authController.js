const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            location,
            connections,
            listings,
            preferences
        } = req.body
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath,
            location,
            connections,
            listings,
            preferences
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email}).exec()
        if (!user) res.status(400).json({msg: 'user does not exist'})
        const match = await bcrypt.compare(password, user.password);
        if (!match) res.status(400).json({msg: 'incorrect password'})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token, user})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    register,
    login
}