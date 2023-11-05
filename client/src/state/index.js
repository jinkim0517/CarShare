import {createSlice} from '@reduxjs/toolkit';


const globalState = {
    user: null,
    token: null,
    posts: [],
    listings: [],
    allUsers: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState: globalState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setPreferences: (state, action) => {
            if(state.user) {
                state.user.preferences = action.payload.preferences
            } else {
                console.log("fdnodf")
            }
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null; 
        },
        setConnections: (state, action) => {
            if (state.user) {
                state.user.connections = action.payload.connections;
            } else {
                console.error("connection doesn't exist")
            }
        },
        setListings: (state, action) => {
            state.listings = action.payload.listings
        },
        setUserlistings: (state, action) => {
                state.user.listings = action.payload.listings

            
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            })
        },
        setListing: (state, action) => {
            const updatedListing = state.listings.map((listing) => {
                if (listing._id === action.payload.listing_id) return action.payload.listing;
                return listing;
            })
        },
        setUsers: (state, action) => {
            state.allUsers = action.payload.allUsers
        }
    }
})

export const {setLogin, setPreferences, setLogout, setConnections, setListings, setPosts, setPost, setListing, setUsers, setUserlistings } = authSlice.actions;
export default authSlice.reducer;