import React from 'react'
import { AppBar, Toolbar, Typography } from "@mui/material"


function Navbar() {
  return (
    <AppBar position='static' sx={{backgroundColor : '#F9F6EE'}}>
      <Toolbar>
        <Typography 
        variant='h2' 
        component="div"
        sx={{
          margin:'auto',
          color:'Black'
          }}>
          Cafe Juan
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;