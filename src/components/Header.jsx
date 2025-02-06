import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/mylogo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (drawerOpen) => () => {
    setDrawerOpen(drawerOpen);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(216, 243, 255, 0.6)',
        backdropFilter: 'blur(8px)',
        color: 'black',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }}>
          <Box
            component="img"
            src={logo}
            alt="Recipe Finder Logo"
            sx={{
              width: {
                xs: '100px',
                sm: '120px',
                md: '150px',
              },
              height: 'auto',
              borderRadius: '15px',
            }}
          />
        </Box>

        {/* PC Nav Links with Animated Underline */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-around' }}>
          {['Cities', 'Countries', 'Regions'].map((text, index) => (
             <Button 
             key={index} 
             component={Link} 
             to={`/${text.toLowerCase()}`} 
             color="inherit"
             sx={{
               textTransform: 'uppercase', // Make text uppercase
               fontWeight: 'bold',
               position: 'relative', // Needed for underline animation
               '&::after': {
                 content: '""',
                 position: 'absolute',
                 width: '0%',
                 height: '2px',
                 bottom: '-4px',
                 left: '50%',
                 backgroundColor: 'black',
                 transition: 'all 0.3s ease-in-out',
                 transform: 'translateX(-50%)',
               },
               '&:hover::after': {
                 width: '100%', // Expands underline on hover
               }
             }}
           >
             {text}
           </Button>
          ))}
        </Box>

        {/* Burger Icon for Mobile */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for Mobile/Tablet Nav Links */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#d8f3ff',
            height: '100%',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <List>
  {['Cities', 'Countries', 'Regions'].map((text, index) => (
    <ListItem button key={index} component={Link} to={`/${text.toLowerCase()}`}>
      <ListItemText 
        primary={text} 
        sx={{ 
          textTransform: 'uppercase', 
          fontWeight: 'bold', 
          position: 'relative',
          color:'black', 
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0%',
            height: '2px',
            bottom: '-2px',
            left: '50%',
            backgroundColor: 'black',
            transition: 'all 0.3s ease-in-out',
            transform: 'translateX(-50%)',
            color:'black',
          },
          '&:hover::after': {
            width: '100%', // Expands underline on hover
          }
        }} 
      />
    </ListItem>
  ))}
</List>

        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
