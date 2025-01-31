import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ImageDisplay from '../components/ImageDisplay';
import PopularDestinations from '../components/PopularDestinations';
//import CategoryList from '../components/CategoryList';
import Cities from '../components/Cities';
import Countries from '../components/Countries';
import Regions from '../components/Regions';

import axios from 'axios';
import { fetchSuggestions } from '../services/Api';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [cityName, setCityName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Country'); // Default category
  const [suggestions, setSuggestions] = useState([]);
  const [images, setImages] = useState([]);
  const [showPopular, setShowPopular] = useState(true);
  const navigate = useNavigate();

 // Handle search execution
 const handleSearch = async (name) => {
  setCityName(name);
  setShowPopular(false);
  try {
    // Fetch images for the given area
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: name,
        per_page: 6,
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      },
    });
    setImages(response.data.results); // Display fetched images
  } catch (error) {
    console.error('Error fetching images:', error);
    setImages([]); // Clear images on error
  }
};

// Fetch suggestions dynamically
const handleFetchSuggestions = async (input, category) => {
  const results = await fetchSuggestions(input, category);
  setSuggestions(results);
};

// Handle category change (clear input and suggestions)
const handleCategoryChange = (newCategory) => {
  setSelectedCategory(newCategory);
  setSuggestions([]); // Clear suggestions on category change
};



  const handleCityClick = (cityName) => {
    navigate(`/city/${cityName}`); // Navigate to the CityDetailsPage
  };

  const handleCountryClick = (countryName) => {
    navigate(`/country/${countryName}`); // Navigate to the CountryDetailsPage
  };

  const handleRegionClick = (regionName) => {
    navigate(`/region/${regionName}`); // Navigate to the RegionDetailsPage
  };

  return (
    <Box sx={{ padding: '20px' }}>
       <SearchBar
        onSearch={handleSearch}
        suggestions={suggestions}
        onFetchSuggestions={handleFetchSuggestions}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
        
        {showPopular && (
        <>
          <PopularDestinations onCityClick={handleCityClick} />
          <Countries onCountryClick={handleCountryClick} />
          <Regions onRegionClick={handleRegionClick} />
          <Cities onCityClick={handleCityClick} />
        </>
      )}
      
       
     
      {!showPopular && <ImageDisplay cityName={cityName} images={images} />}
    </Box>
  );
};

export default HomePage;
