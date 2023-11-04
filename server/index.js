const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { fileURLToPath } = require('url')
const authController = require('./controllers/authController.js')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js');
const { verifyJWT } = require('./middleware/auth.js');
const postRoutes = require('./routes/posts.js')
const listingRoutes = require('./routes/listings.js')
const {createListing} = require('./controllers/listingsController.js')
const { createPost } = require('./controllers/postsController.js')

//Middleware
dotenv.config();
const app = express();

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

// Files Config

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename:  (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage})

//File routes
app.post("/auth/register", upload.single('picture'), authController.register);
app.post("/posts", verifyJWT, upload.single('picture'), createPost)
app.post("/listings", verifyJWT, upload.single('picture'), createListing)

//Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes)
app.use('/listings', listingRoutes)

//mongoose setup
const PORT = process.env.PORT || 6001

try {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
} catch (err) {
    console.log(err)
}

mongoose.connection.on('open', () => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})
