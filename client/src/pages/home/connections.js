import React from 'react'
import { Box, useMediaQuery, Typography } from "@mui/material";

import MyPostWidget from "pages/widgets/MyPost";
import ConnectionsWidget from 'pages/widgets/Connections';
import UserWidget from "pages/widgets/User";
import { useSelector } from "react-redux";
import ConnectionListWidget from 'pages/widgets/ConnectionsList';
import FilterWidget from 'pages/widgets/Filter';

const Connections = () => {
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
               <ConnectionsWidget userId={_id} />
                
            </Box>

            {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FilterWidget />
            <Box m="2rem 0" />
            <ConnectionListWidget userId={_id} />
          </Box>
        )}
      </Box>
            
        </>
  )
}

export default Connections