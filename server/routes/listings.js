const { getSavedListings, getFeedListings, createListing, saveListing } = require('../controllers/listingsController')
const { verifyJWT } = require('../middleware/auth.js')

const express = require('express')
const router = express.Router();



/* READ */
router.get("/", verifyJWT, getFeedListings);
router.get("/:userId/saved", verifyJWT, getSavedListings);
router.patch('/:id/:listingId', verifyJWT, saveListing)

module.exports = router