import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./layout";

import Nav from "pages/nav";
import UserWidget from "pages/widgets/User";
import { useSelector } from "react-redux";
import MyListingWidget from 'pages/widgets/MyListingWidget';
import ListingsWidget from 'pages/widgets/Listings';
import ListingListWidget from 'pages/widgets/ListingList';

const Listings = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const { _id, picturePath } = useSelector((state) => state.user)
  return (
    <>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap="0.5rem"
                justifyContent='space-between' >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                
            <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
               <ListingsWidget userId={_id} />
                
            </Box>

            <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
                <MyListingWidget picturePath={picturePath} />
                <Box m="2rem 0" />
                <ListingListWidget userId={_id} />
                
            </Box>
                
            </Box>
            
        </>
  )
}

export default Listings