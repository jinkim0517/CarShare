import { Box, Typography, useTheme } from "@mui/material";
import ConnectionWidget from "./Connection";
import Wrapper from "shared/Wrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "state";

const ConnectionListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const connections = useSelector((state) => state.user.connections);

  const getConnections = async () => {
    const response = await fetch(
      `https://carsharebackend.onrender.com/users/${userId}/connections`,
      {
        mode: 'cors',
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setConnections({ connections: data }));
  };

  useEffect(() => {
    getConnections();
  }, []); 

  return (
    <Wrapper>
      <Typography
        color='black'
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Current Connections
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {connections.map((friend) => (
          <ConnectionWidget
            connectionId={friend._id}
            name={`${friend.firstname} ${friend.lastname}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </Wrapper>
  );
};

export default ConnectionListWidget;