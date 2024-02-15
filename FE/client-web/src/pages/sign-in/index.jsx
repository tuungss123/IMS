import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./style.css"

const SignIn = () => {
  const navigate = useNavigate();

  function login(){
    navigate('/inventory');
  }

  return (
    <Box id='main-container'>
      <Paper 
        elevation={2}
        variant="elevation" square
        spacing={2}
        id='sign-in-container'
      >
        <Box id="sign-in-header">
          <Typography variant="h5">
            Sign In
          </Typography>

          <Typography variant="subtitle1">Sign in to your account.</Typography>
        </Box>

        <TextField className="input-field" label="Username"/>
        <TextField 
          className="input-field"
          label="Password"
          type="password"
        />

        <Box id="forgot-password-section">
          <Button>Forgot Password?</Button>
        </Box>

        <Button id="sign-in-button" variant="contained" onClick={login}>Button</Button>
      </Paper>

      <Box
        id='sign-in-main-content'
      >
          <Typography variant="h2">
            Inventory Monitoring System
          </Typography>

          <Typography variant="subtitle1">This is your inventory monitoring system.</Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
