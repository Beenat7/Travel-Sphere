import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({
  onSearch,
  suggestions,
  onFetchSuggestions,
  selectedCategory,
  onCategoryChange,
}) => {
  const [input, setInput] = useState('');

  // Clear input when category changes
  useEffect(() => {
    setInput(''); // Clear the input field
  }, [selectedCategory]);

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input, selectedCategory);
      onFetchSuggestions('');
      setInput(''); // Clear input after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onFetchSuggestions(value, selectedCategory);
  };
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion); // Fill input with selected suggestion
    onSearch(suggestion, selectedCategory); // Trigger search
    onFetchSuggestions(''); // Clear the suggestions after search
  };
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
      alignItems: { xs: 'stretch', sm: 'center' }, // Align items for respective layouts
      gap: { xs: 2, sm: 2 }, // Add spacing between items
      mb: 4,
      mt: 10,
      width: '100%',
      maxWidth:  {
        xs: 400, // 2 spacing units for extra-small screens (mobile)
       sm: 500, // 3 spacing units for small screens (e.g., tablets)
       // 4 spacing units for medium screens (e.g., laptops)
       // lg: 50, // 5 spacing units for large screens (e.g., desktops)
        //xl:53,

      },
      mx: 'auto',
    }}
  >
    {/* Dropdown for category selection */}
    <Select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      sx={{
        mb: { xs: 1, sm: 0 }, 
        Width: { xs: '150px', sm: '150px' },
        maxWidth: '150px',
        backgroundColor: 'white',
        borderRadius: 5,
        //border: '2px solid #f4a300', // Add border color
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#f4a300 !important', // Ensure border color is applied
        },
       
      }}
    >
      <MenuItem value="Country">Country</MenuItem>
      <MenuItem value="City">City</MenuItem>
      <MenuItem value="Region">Region</MenuItem>
    </Select>

    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 2, // Space between TextField and Button
    }}
  >

    {/* SearchInput: Input field for city name */}
    <TextField
      label="Where do you want to go?"
      variant="outlined"
      fullWidth
      value={input}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      sx={{
        backgroundColor: 'white',
        borderRadius: 6,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#f4a300',
            borderRadius: 6,
          },
          '&:hover fieldset': {
            borderColor: '#f4a300',
          },
        },
        '& .MuiFormLabel-root': {
          color: 'black',
        },
        '& .MuiInputBase-input': {
          padding: '15px',
        },
      }}
    />

   
    <Button
      variant="contained"
      onClick={handleSearch}
      sx={{
        padding: '10px',
        borderRadius: 10,
        backgroundColor: '#f4a300',
        '&:hover': {
          backgroundColor: '#f4a300',
        },
      }}
    >
      <SearchIcon />
    </Button>
    </Box>

    {/* Suggestions */}
    {suggestions.length > 0 && (
      <Box
        sx={{
          width: '100%',
          maxWidth: //300,
          {
            xs: 200, // 2 spacing units for extra-small screens (mobile)
           sm: 250, // 3 spacing units for small screens (e.g., tablets)
           md: 300, // 4 spacing units for medium screens (e.g., laptops)
           // lg: 50, // 5 spacing units for large screens (e.g., desktops)
            //xl:53,

          },
          backgroundColor: 'white',
          boxShadow: 2,
          borderRadius: 6,
          mt: {
            xs: 18, // 2 spacing units for extra-small screens (mobile)
            sm: 54, // 3 spacing units for small screens (e.g., tablets)
            md: 55, // 4 spacing units for medium screens (e.g., laptops)
            lg: 57, // 5 spacing units for large screens (e.g., desktops)
            xl:60,

          },
         
          zIndex: 10,
          position: 'absolute', // Ensures suggestions appear on top

          
        }}
      >
        {suggestions.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
            onClick={() => handleSuggestionClick(item)}
          >
            {item}
          </Box>
        ))}
      </Box>
    )}
  </Box>

  );
};

export default SearchBar;