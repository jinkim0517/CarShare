import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setConnections, setPreferences } from "state";
import PostWidget from "./Post";
import Wrapper from "shared/Wrapper";
import ConnectionWidget from "./Connection";
import { Link, Navigate } from "react-router-dom";
import { Typography, InputBase, MenuItem, Box, useTheme, FormControl, Select, Button} from "@mui/material";

import React from 'react'

const FilterWidget = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.user)
    const users = useSelector((state) => state.allUsers);
    const filler = 'dfd'
    const preferences = useSelector((state) => state.user.preferences)
    const token = useSelector((state) => state.token);
    const theme = useTheme()
    const { palette } = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const [firstClassFilter, setFirstClassFilter] = useState("");
    const [lastClassFilter, setLastClassFilter] = useState("");

    const filterByCrit = (crit, value) => {
      const filteredUsers = users.filter((user) => {
        const prefs = user.preferences[0].split(',')
        if (crit == 'firstClass') {
          return prefs[0] == value
        } else {
          return prefs[1] == value
        }
      })
      dispatch(setUsers({allUsers: filteredUsers}))
    }

    const filterByMyPrefs = () => {
      const filteredUsers = users.filter((user) => {
        const prefs = user.preferences[0].split(',')
        const currPrefs = currUser.preferences[0].split(',')
          return prefs[0] == currPrefs[0] && prefs[1] == currPrefs[1]
      })
      dispatch(setUsers({allUsers: filteredUsers}))
    }

    const getUsers = async () => {
      const response = await fetch("https://carsharebackend.onrender.com/users", {
        mode: 'cors',
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setUsers({ allUsers: data }));
  };



  return (
    <Wrapper>
      <Typography
        color='black'
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Filter By
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      <FormControl variant="standard" value={filler}>
    <Select
      value={filler}
      sx={{
        backgroundColor: "rgb(255, 243, 238)",
        width: "200px",
        borderRadius: "0.25rem",
        p: "0.25rem 1rem",
        "& .MuiSvgIcon-root": {
          pr: "0.25rem",
          width: "3rem",
        },
        "& .MuiSelect-select:focus": {
          backgroundColor: "rgb(255, 243, 238)",
        },
      }}
      input={<InputBase />}
    >
      <MenuItem value={filler} >
        <Typography>
        {firstClassFilter}
        </Typography>
      </MenuItem>
      <MenuItem  onClick={() => {
        filterByCrit('firstClass', 'early')
        setFirstClassFilter("Morning First Class");
        }}>
        <Typography>Morning First Class</Typography>
      </MenuItem>
      <MenuItem  onClick={() => {filterByCrit('firstClass', 'medium')}}>
        <Typography>Afternoon First Class</Typography>
      </MenuItem>
      <MenuItem onClick={() => {filterByCrit('firstClass', 'late')}}>
        <Typography>Evening First Class</Typography>
      </MenuItem>
    </Select>
  </FormControl>

  <FormControl variant="standard" value={filler}>
    <Select
      value={filler}
      sx={{
        backgroundColor: "rgb(255, 243, 238)",
        width: "200px",
        borderRadius: "0.25rem",
        p: "0.25rem 1rem",
        "& .MuiSvgIcon-root": {
          pr: "0.25rem",
          width: "3rem",
        },
        "& .MuiSelect-select:focus": {
          backgroundColor: "rgb(255, 243, 238)",
        },
      }}
      input={<InputBase />}
    >
      <MenuItem value={filler} >
        <Typography>
        {lastClassFilter}
        </Typography>
      </MenuItem>
      <MenuItem  onClick={() => {
        filterByCrit('lastClass', 'early')
        setLastClassFilter("Morning Last Class")
        }}>
        <Typography>Morning Last Class</Typography>
      </MenuItem>
      <MenuItem  onClick={() => {filterByCrit('lastClass', 'medium')}}>
        <Typography>Afternoon Last Class</Typography>
      </MenuItem>
      <MenuItem onClick={() => {filterByCrit('lastClass', 'late')}}>
        <Typography>Evening Last Class</Typography>
      </MenuItem>
    </Select>
  </FormControl>

  <Button onClick={filterByMyPrefs} sx={{
    backgroundColor: "rgb(242, 138, 86)",
    color: "white"
  }} >Filter By My Preferences</Button>
  <Button onClick={getUsers} sx={{
    backgroundColor: "rgb(242, 138, 86)",
    color: "white"
  }}>Reset Filters</Button>
      </Box>
    </Wrapper>
    
  )
}

export default FilterWidget