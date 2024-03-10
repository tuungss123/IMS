import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [openErrorDialog, setOpenErrorDialog] = useState(false); // State for error dialog

  const validateForm = () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const login = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading state to true when login is initiated

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch(`http://127.0.0.1:8000/login`, requestOptions);
    // const response = await fetch(`https://ims-be-j66p.onrender.com/login`, requestOptions);
    const data = await response.json();
    console.log(data.response);

    setLoading(false); // Set loading state to false after response is received

    if (data.response === 'Login successful') {
      localStorage.setItem('user_data', JSON.stringify(data.user_data));

      if (data.user_data === 'Cafe' || data.user_data === 'Intern') {
        navigate('/cafeinventory');
      } else if (data.user_data === 'Commissary') {
        navigate('/commissary/inventory');
      }
    } else {
      setOpenErrorDialog(true); // Open error dialog if login fails
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false); // Close error dialog
  };

  return (
    <Box id="main-container">
      <Paper elevation={2} variant="elevation" square spacing={2} id="sign-in-container">
        <Box id="sign-in-header">
          <Typography variant="h5">Sign In</Typography>
          <Typography variant="subtitle1">Sign in to your account.</Typography>
        </Box>

        <TextField
          className="input-field"
          label="Username"
          onChange={(user) => setUsername(user.target.value)}
          onKeyDown={handleKeyDown}
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          className="input-field"
          label="Password"
          onChange={(pass) => setPassword(pass.target.value)}
          type="password"
          onKeyDown={handleKeyDown}
          error={!!passwordError}
          helperText={passwordError}
        />

        <Button id="sign-in-button" variant="contained" onClick={login} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </Paper>

      <Box id="sign-in-main-content">
        <Typography variant="h2">Inventory Monitoring System</Typography>
        <Typography variant="subtitle1">This is your inventory monitoring system.</Typography>
      </Box>

      {/* Error Dialog */}
      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog} sx={{ '& .MuiDialogTitle-root': { backgroundColor: '#8F011B ', color: '#fff' } }}>
  <DialogTitle>Wrong Credentials</DialogTitle>
  <DialogContent>
    <DialogContentText>Incorrect username or password. Please try again.</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseErrorDialog} color="primary">Close</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default SignIn;
