import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    DisabledByDefaultOutlined,
    CheckBox,
    WbTwilight,
    Brightness5,
    Brightness6,
    Brightness4
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "shared/UserImage";
import FlexBetween from "shared/FlexBetween";
import Wrapper from "shared/Wrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`https://carsharebackend.onrender.com/users/${userId}`, {
            mode: 'cors',
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const {
        firstname,
        lastname,
        email,
        password,
        location,
        connections,
        listings,
        preferences
    } = user;

    

    const prefArr = preferences[0].split(',');

    return (
        <Wrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={palette.neutral.main}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: '#E0E0E0',
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstname} {lastname}
                        </Typography>
                        <Typography color={medium}>{connections.length} connections</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Preferences
                </Typography>

                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    {
                        prefArr[0] == 'early' && <Brightness5 fontSize="large" sx={{ color: main }} />
                    }
                    {
                        prefArr[0] == 'medium' && <Brightness6 fontSize="large" sx={{ color: main }} />
                    }
                    {
                        prefArr[0] == 'late' && <Brightness4 fontSize="large" sx={{ color: main }} />
                    }

                    <Typography color={medium}>{`First class is ${prefArr[0]}`}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    {
                        prefArr[1] == 'early' && <Brightness5 fontSize="large" sx={{ color: main }} />
                    }
                    {
                        prefArr[1] == 'medium' && <Brightness6 fontSize="large" sx={{ color: main }} />
                    }
                    {
                        prefArr[1] == 'late' && <Brightness4 fontSize="large" sx={{ color: main }} />
                    }

                    <Typography color={medium}>{`Last class is ${prefArr[0]}`}</Typography>
                </Box>

               
            </Box>
        </Wrapper>
    );
};

export default UserWidget;