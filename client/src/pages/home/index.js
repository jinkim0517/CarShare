import { Box, useMediaQuery } from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./layout";
import Default from "./default";
import Listings from "./listings"

import Nav from "pages/nav";
import MyPostWidget from "pages/widgets/MyPost";
import PostsWidget from "pages/widgets/Posts";
import UserWidget from "pages/widgets/User";
import ProfilePage from "pages/profile";
import Connections from "./connections";

import { useSelector } from "react-redux";



const Home = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const { _id, picturePath } = useSelector((state) => state.user)
    return (
        <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Default />} />
                <Route path="listings" element={<Listings />} />
                <Route path="connections" element={<Connections />} />
            </Route>
        </Routes>
        
    )
};

export default Home;