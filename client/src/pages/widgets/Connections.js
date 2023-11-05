import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setConnections, setPreferences } from "state";
import PostWidget from "./Post";
import Wrapper from "shared/Wrapper";
import ConnectionWidget from "./Connection";

const ConnectionsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const preferences = useSelector((state) => state.preferences)
    const connections = useSelector((state) => state.connections)
    const token = useSelector((state) => state.token);

    const getUsers = async () => {
        const response = await fetch("https://carsharebackend.onrender.com/users", {
            mode: 'cors',
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setUsers({ allUsers: data }));
    };

    const getUserConnections = async () => {
        const response = await fetch(
            `https://carsharebackend.onrender.com/posts/${userId}/connections`,
            {
                mode: 'cors',
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setConnections({ connections: data }));
    };


    const getUserPreferences = async () => {
        const response = await fetch(
            `https://carsharebackend.onrender.com/posts/${userId}/preferences`,
            {
                mode: 'cors',
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPreferences({ preferences: data }));
    };

    useEffect(() => {
        getUsers()
        if (isProfile) {
            getUserConnections()
            getUserPreferences();
        }
    }, []);

    return (
        <>
            {users.map(
                ({
                    _id,
                    firstname,
                    lastname,
                    email,
                    password,
                    picturePath,
                    location,
                    connections,
                    listings,
                    preferences
                }) => (
                    <Wrapper m="2rem 0">
                        <ConnectionWidget
                            connectionId={_id}
                            name={`${firstname} ${lastname}`}
                            subtitle={location}
                            userPicturePath={picturePath}
                        />
                    </Wrapper>

                )
            )}
        </>
    );
};

export default ConnectionsWidget;