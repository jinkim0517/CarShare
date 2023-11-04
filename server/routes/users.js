const express = require('express')
const {
    getUser,
    getUserConnections,
    addRemoveConnection,
    getUserPreferences,
    getUsers
} = require('../controllers/usersController.js')
const { verifyJWT } = require('../middleware/auth.js')

const router = express.Router()

//read routes

router.get('/', verifyJWT, getUsers);
router.get('/:id', verifyJWT, getUser)
router.get("/:id/connections", verifyJWT, getUserConnections);
router.get("/:id/preferences", verifyJWT, getUserPreferences)
router.patch('/:id/:connectionId', verifyJWT, addRemoveConnection)

module.exports = router