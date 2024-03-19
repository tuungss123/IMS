import { SidenavData } from './SidenavData';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "./styles.css";


function SideNav() {
  const navigate = useNavigate();

  function changePageContent(page){
    navigate(page);
  }

  useEffect(() => {
    const newSocket = new WebSocket('ws://127.0.0.1:8000/ws/ims/1');

    newSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage);
    };

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
    };
  }, []);

  return (
    <div className='side-bar'>
        <Box id='system-profile'>
          <Typography variant="h5">Cafe Juan</Typography>

          <Box id='profile'></Box>
          <Typography variant='h6'>{JSON.parse(localStorage.getItem('user_data'))}</Typography>
        </Box>

        <ul className='side-bar-links'>
        {SidenavData.map(( val, key) => {
            return( 
                <li 
                  key={key} 
                  className='row'
                  id={window.location.pathname == val.link ? "active" : ""}
                  onClick={() => changePageContent(val.link)}
                >
                    <div id='icon'>{val.icon}</div>
                    <div id='title'>{val.title}</div>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

export default SideNav;