const Listing = require('../models/Listing.js')
const User = require('../models/User.js');

const createListing = async (req, res) => {
    try {
        const { link, userId, picturePath, } = req.body;
        const user = await User.findById(userId)
        const newListing = await  Listing.create({
            link,
            location: user.location,
            userId,
            picturePath,
            userPicturePath: user.picturePath
        })
        const listings = await Listing.find()
        res.status(201).json(listings)

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const getFeedListings = async (req, res) => {
    try {
        const listing = await Listing.find()
        res.status(200).json(listing)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}



const saveListing = async (req, res) => {
    try {
        const {id, listingId} = req.params;
        const user = await User.findById(id);
        const listing = await Listing.findById(listingId)

        if (user.listings.includes(listingId)) {
            user.listings = user.listings.filter((id) => id !== listingId);
        } else {
            user.listings.push(listingId)
        }
        await user.save()

      const listings = await Promise.all(
        user.listings.map((id) => Listing.findById(id))
      );
      const formattedlistings = listings.map(
        ({ _id, link,
            location,
            userId,
            picturePath,
            userPicturePath }) => {
          return { _id, link,
            location,
            userId,
            picturePath,
            userPicturePath };
        }
      );

          res.status(200).json(formattedlistings);
    } catch (err) {
        res.status(404).json({error: err.message})
    }  
}

const getSavedListings = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);

        const listings = await Promise.all(
            user.listings.map((id) => Listing.findById(id))
          );
          const formattedlistings = listings.map(
            ({ _id, link,
                location,
                userId,
                picturePath,
                userPicturePath }) => {
              return { _id, link,
                location,
                userId,
                picturePath,
                userPicturePath };
            }
          );
    
        res.status(200).json(formattedlistings);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
   
}

module.exports = {
    saveListing,
    getSavedListings,
    getFeedListings,
    createListing
}