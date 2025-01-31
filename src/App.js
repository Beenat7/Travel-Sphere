//#d8f3ff 60% ,#a0d8b3 30% , #f4a300  10%

import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
//import SearchBar from './components/SearchBar';

import { Box } from '@mui/material';
function App() {
  return (
    <Router>
      <div>
      <Box sx={{ 
          backgroundColor: '#d8f3ff', 
          minHeight: '100vh',
          minWidth: '100%',
          color: 'black',
          overflowX: 'hidden',
          mx: 'auto',
        }}> 
        <Header/> 
        {/* <SearchBar/> */}
        <AppRoutes/>
        <Footer/> 

        </Box>  
      </div>
    </Router>

  );
}

export default App;
