const {getFeedPosts, getUserPosts } = require('../controllers/postsController')
const { verifyJWT } = require('../middleware/auth.js')

const express = require('express')
const router = express.Router();



/* READ */
router.get("/", verifyJWT, getFeedPosts);
router.get("/:userId/posts", verifyJWT, getUserPosts);

module.exports = router