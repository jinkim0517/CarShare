import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setConnections } from "state";
import FlexBetween from "shared/FlexBetween";
import UserImage from "shared/UserImage";

const ConnectionWidget = ({connectionId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const connections = useSelector((state) => state.user.connections);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  const isConnection = connections.find((connection) => connection._id === connectionId);

  const patchConnection = async () => {
    const response = await fetch(
      `https://carsharebackend.onrender.com/users/${_id}/${connectionId}`,
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
    console.log(data)
    dispatch(setConnections({ connections: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${connectionId}`);
            navigate(0);
          }}
        >
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: "#E0E0E0",
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchConnection()}
        sx={{ backgroundColor:'rgb(242, 138, 86)', p: "0.6rem" }}
      >
        {isConnection ? (
          <PersonRemoveOutlined sx={{ color:'white' }} />
        ) : (
          <PersonAddOutlined sx={{ color: 'white' }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default ConnectionWidget;