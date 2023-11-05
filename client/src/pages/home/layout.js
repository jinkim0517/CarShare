import React from 'react'
import Nav from 'pages/nav'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <Box >
        <Nav />
        <Outlet />
    </Box>
  )
}

export default Layout