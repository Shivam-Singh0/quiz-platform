import * as React from 'react';
import { useState } from 'react'; // Import useState hook
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png';
import { Button } from '@mui/material';

function Header() {
  const [activeLink, setActiveLink] = useState('Home'); // State to keep track of active link

  // Function to handle click on a link
  const handleClick = (link) => {
    setActiveLink(link); // Update active link state
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" color='inherit'>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="" height={'22px'} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button component={Link} to="/" onClick={() => handleClick('Home')} style={{ textDecoration: 'none', 
          color: activeLink === 'Home' ? 'blue' : 'inherit', marginRight: '20px' }} sx={{
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
          }}>
            <Typography color="inherit">Home</Typography>
          </Button>
          <Button component={Link} to="/myquiz" onClick={() => handleClick('My Quizzes')} style={{ textDecoration: 'none', 
          color: activeLink === 'My Quizzes' ? 'blue' : 'inherit'  }}  sx={{
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
          }}>
            <Typography color="inherit">My Quizzes</Typography>
          </Button>
          <Button component={Link} to="/playForum" onClick={() => handleClick('Play Quiz')} style={{ textDecoration: 'none', 
          color: activeLink === 'Play Quiz' ? 'blue' : 'inherit'  }}  sx={{
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
          }}>
            <Typography color="inherit">Play Quiz</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
