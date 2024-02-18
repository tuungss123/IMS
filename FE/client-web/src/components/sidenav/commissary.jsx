import { CommissarySidenavData } from './CommissarySidenavData';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./styles.css";


function CommissarySidenav() {
  const navigate = useNavigate();

  function changePageContent(page){
    navigate(page);
  }

  return (
    <div className='side-bar'>
        <Box id='system-profile'>
          <Typography variant="h5">Cafe Juan</Typography>

          {/* INSERT IMAGE HERE */}
          <Box id='profile'></Box>
          <Typography variant='h6'>{JSON.parse(localStorage.getItem('user_data'))}</Typography>
          <Typography variant='subtitle1'>Commissary User</Typography>
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
                    <div id='title'>{val.title}</div>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

export default CommissarySidenav;