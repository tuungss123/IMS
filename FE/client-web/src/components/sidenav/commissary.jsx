import { CommissarySidenavData } from './CommissarySidenavData';
import { Box, Paper, TextField, Button, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./styles.css";


function CommissarySidenav() {
  const navigate = useNavigate();
  const [newNotifsCount, setNewNotifsCount] = useState(0);

  function changePageContent(page){
    navigate(page);
  }

  async function retrieveNotifsCount(){
    let username = JSON.parse(localStorage.getItem('user_data'));
    console.log('Retrieving notifs count...');

    const data = await fetch(`http://127.0.0.1:8000/retrieve_notifications/${username}`);
    const response = await data.json();
    console.log(response);
    setNewNotifsCount(response.new_notifs);
  }

  useEffect(() => {
    retrieveNotifsCount();

    const new_interval = setInterval(() => {
      retrieveNotifsCount();
    } , 2000)

    return () => {
      clearInterval(new_interval);
    }
  }, []);

  return (
    <div className='side-bar'>
        <Box id='system-profile'>
          <Typography variant="h5">Commissary</Typography>
          <Box id='profile' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={{ width: 100, height: 100 }} src="https://github.com/tuungss123/IMS/blob/dev/commissary.jpg?raw=true" alt="Profile Picture" ></Avatar>
          </Box>
        </Box>

        <ul className='side-bar-links'>
        {CommissarySidenavData.map(( val, key) => {
            return( 
                <li 
                  key={key} 
                  className='row'
                  id={window.location.pathname == val.link ? "active" : ""}
                  onClick={() => changePageContent(val.link)}
                >
                    <div id='icon'>{val.icon}</div>
                    <div id='title'>
                      {val.title === "Notifications" ? (
                        <>{val.title} <span id="notifs-count">{newNotifsCount}</span></>
                      ) : (
                        val.title
                      )}
                    </div>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

export default CommissarySidenav;