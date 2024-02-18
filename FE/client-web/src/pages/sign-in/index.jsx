import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./style.css"

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login(){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    }

    const response = await fetch(`http://127.0.0.1:8000/login`, requestOptions);
    const data = await response.json();

    if (data.response == 'Login successful'){
      localStorage.setItem('user_data', JSON.stringify(data.user_data));
      
      if (data.user_data == 'Cafe' || data.user_data == 'Intern'){
        navigate('/cafeinventory');
      }
      else if (data.user_data == 'Commissary'){
        navigate('/commissary/inventory');
      }
    }
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

        <TextField className="input-field" label="Username" onChange={(user) => setUsername(user.target.value)} />
        <TextField 
          className="input-field"
          label="Password"
          onChange={(pass) => setPassword(pass.target.value)}
          type="password"
        />

        <Box id="forgot-password-section">
          <Button onClick={() => login()}>Forgot Password?</Button>
        </Box>

        <Button id="sign-in-button" variant="contained" onClick={login}>Sign In</Button>
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
