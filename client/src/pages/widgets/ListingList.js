import { Box, List, Typography, useTheme, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ConnectionWidget from "./Connection";
import Wrapper from "shared/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserlistings} from "state";
import { Link } from "react-router-dom";

const ListingListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const listings = useSelector((state) => state.user.listings);



  const getListings = async () => {
    const response = await fetch(
      `https://carsharebackend.onrender.com/listings/${userId}/saved`,
      {
        mode: 'cors',
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data)
    dispatch(setUserlistings({ listings: data }));
  };

  useEffect(() => {
    getListings();
  }, []); 

  return (
    <Wrapper>
      <Typography
        color="black"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Listings
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <List>
        
        {listings.map((listing) => (
           <ListItem disablePadding backgroundColor={palette.neutral.light}>
           <ListItemButton component={Link} to={listing.link} target="_blank">
             <ListItemText primary={listing.link}>{listing.link}</ListItemText>
           </ListItemButton>
         </ListItem>
        ))}
          </List>
      </Box>
    </Wrapper>
  );
};

export default ListingListWidget;