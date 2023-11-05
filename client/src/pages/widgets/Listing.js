import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, Link, Button } from "@mui/material";
  import FlexBetween from "shared/FlexBetween";
  import WidgetWrapper from "shared/Wrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setUserlistings } from "state";
  import Connection from "shared/Connection";
  
  const ListingWidget = ({
          listingId,
          link,
          location,
          userId,
          picturePath,
          userPicturePath
  }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const firstname = useSelector((state) => state.user.firstname);
    const lastname = useSelector((state) => state.user.lastname);
    const listings = useSelector((state) => state.user.listings);
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchListing = async () => {
      console.log(listings)
        const response = await fetch(
          `https://carsharebackend.onrender.com/listings/${loggedInUserId}/${listingId}`,
          {
            mode: 'cors',
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        const data = await response.json();
        
        dispatch(setUserlistings({listings: data}))
        
      };

      const isListing = listings.find((listing) => listing._id === listingId);
      
      
      
    return (
      <WidgetWrapper m="2rem 0">
        
        <Connection
        connectionId={loggedInUserId}
        name={`${firstname} ${lastname}`}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      
      <Box>
      <Box m="1rem 0" />
        <Box>
        <Button 
            sx={{
              color: "rgb(255, 255, 255)",
              background: "rgb(242, 138, 86)",
              borderRadius: "3rem",
            }}
           onClick={patchListing}>{isListing ? "Delete" : "Save"}</Button>
        </Box>
        <Box m="1rem 0" />

      
        <Box>
        <Link sx={{ mt: "1rem" }} href={link} target="_">
          link to listing host
        </Link>
        </Box>
        
      </Box>

        
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="listing"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`https://carsharebackend.onrender.com/assets/${picturePath}`}
          />
        )}
      </WidgetWrapper>
    );
  };
  
  export default ListingWidget;