import React from "react";
import { Box, Paper, TextField, Button } from '@mui/material'

import bgImage from '/Users/RYZEN 5 5600g/Desktop/IMS/FE/client-web/src/assets/bg.svg'


const SignIn = () => {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90vh",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>

      <Paper 
        elevation={6}
        variant="elevation" square
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px",
          flexDirection: "column",
          height: "40vh",
          width: "50%",
          gap: "16px",
          borderRadius: "1%"
        }}
      >
        <TextField 
          label="Email Address"
        />
        <TextField 
          label="Password"
          type="password"
        />
        <Button variant="contained">Button</Button>
      </Paper>
    </Box>
  );
};

export default SignIn;
