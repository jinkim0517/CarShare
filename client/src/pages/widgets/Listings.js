import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "state";
import ListingWidget from "./Listing";

const ListingsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const token = useSelector((state) => state.token);

  const getListings = async () => {
    const response = await fetch("https://carsharebackend.onrender.com/listings", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    
    dispatch(setListings({ listings: data }));
  };

  const getUserListings = async () => {
    const response = await fetch(
      `https://carsharebackend.onrender.com/listings/${userId}/saved`,
      {
        mode: 'cors',
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setListings({ listings: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserListings();
    } else {
      getListings();
      console.log(listings)
    }
  }, []); 

  return (
    <>
      {listings.map(
        ({
          _id,
          link,
          location,
          userId,
          picturePath,
          userPicturePath
        }) => (
          <ListingWidget 
          listingId={_id}
          link={link}
          location={location}
          userId={userId}
          picturePath={picturePath}
          userPicturePath={userPicturePath} />
        )
      )}
    </>
  );
};

export default ListingsWidget;