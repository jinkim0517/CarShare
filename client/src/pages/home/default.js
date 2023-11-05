import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./layout";

import Nav from "pages/nav";
import MyPostWidget from "pages/widgets/MyPost";
import PostsWidget from "pages/widgets/Posts";
import UserWidget from "pages/widgets/User";
import { useSelector } from "react-redux";

const Default = () => {
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
               <PostsWidget userId={_id} />
                
            </Box>

            <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
                <MyPostWidget picturePath={picturePath} />
                
            </Box>
                
            </Box>
            
        </>
  )
}

export default Default