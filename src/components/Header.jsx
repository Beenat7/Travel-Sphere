import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/mylogo.png'
import { Link } from 'react-router-dom';

const Header = () => {
  // State for managing the drawer (burger menu)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle the drawer
  const toggleDrawer = (drawerOpen) => () => {
    setDrawerOpen(drawerOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#d8f3ff ', color: 'black' }} >
      <Toolbar>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }}>
          <Box 
            component="img"
            src={logo} 
            alt="Recipe Finder Logo"
            sx={{
            width: {
                xs: '100px', // 100px width on extra-small screens (mobile)
                sm: '120px', // 120px on small screens (tablets)
                md: '150px', // 150px on medium and up
            },
        height: 'auto',
        borderRadius: '15px',
      }}
      />
        </Box>

        {/* PC Nav Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-around'}}>
          <Button component={Link} to="/cities" color="inherit">Cities</Button>
          <Button component={Link} to="/countries" color="inherit">Countries</Button>
          <Button component={Link} to="/regions" color="inherit">Regions</Button>
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
        <Box sx={{ width: 250,
             backgroundColor: '#d8f3ff', 
             height: '100%',
             color: 'black',
             display: 'flex', 
             flexDirection: 'column',  }} role="presentation" onClick={toggleDrawer(false)}>
        <IconButton onClick={toggleDrawer}>
              <CloseIcon /> {/* X icon to close the menu */}
            </IconButton>
          <List>
            <ListItem button component={Link} to="/cities">
              <ListItemText primary="Cities" sx={{ color: 'black' }} />
            </ListItem>
            <ListItem button component={Link} to="/countries">
              <ListItemText primary="Countries" sx={{ color: 'black' }} />
            </ListItem>
            <ListItem button component={Link} to="/regions">
              <ListItemText primary="Regions" sx={{ color: 'black' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
