import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

const popularCities = [
  { name: 'Paris', country: 'France' },
  { name: 'New York', country: 'USA' },
  { name: 'Tokyo', country: 'Japan' },
  { name: 'Sydney', country: 'Australia' },
  { name: 'London', country: 'UK' },
  { name: 'Rome', country: 'Italy' },
];

const PopularDestinations = ({ onCityClick }) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updatedDestinations = await Promise.all(
          popularCities.map(async (city) => {
            const response = await axios.get(
              `https://api.unsplash.com/search/photos`,
              {
                params: {
                  query: city.name,
                  client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
                  per_page: 1,
                },
              }
            );
            const imageUrl = response.data.results[0]?.urls.small || '';
            return { ...city, image: imageUrl };
          })
        );
        setDestinations(updatedDestinations);
      } catch (error) {
        console.error('Error fetching images for popular destinations:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {destinations.map((destination, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            onClick={() => onCityClick(destination.name)} // Trigger onCityClick with city name
            sx={{
              position: 'relative',
              overflow: 'hidden',

              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={destination.image}
              alt={destination.name}
            />
              {/* Hover Message */}
              <Box
  sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Set semi-transparent background directly
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0, // Initially hidden
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1, // Fully visible on hover
    },
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 'bold',
      color: '#f4a300', // Set text color to #f4a300
    }}
  >
    Click Me
  </Typography>
</Box>




            <CardContent 
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  textAlign: 'center', // Optional: Align text in the center
                }}

            
            >
              <Typography variant="h6" >{destination.name}</Typography>
              <Typography variant="body2" >
                {destination.country}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularDestinations;






























/* import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { fetchPopularCities } from '../services/Api'; // Import the new API function
import { useNavigate } from "react-router-dom";
//import api from '../services/api'; 

const DestinationSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of popular cities
  const fetchSuggestions = async () => {
    try {
      const cities = await fetchPopularCities();
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Navigate to City Details page on card click
  const handleCardClick = (citySlug) => {
    navigate(`/city/${citySlug}`);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Popular Destinations
      </Typography>
      <Grid container spacing={2}>
        {suggestions.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.slug}>
            <Card 
              onClick={() => handleCardClick(city.slug)}
              sx={{ cursor: "pointer", boxShadow: 3 }}
            >
              <CardMedia
                component="img"
                height="140"
                image={city.image || "https://via.placeholder.com/300"} // Fallback image
                alt={city.name}
              />
              <CardContent>
                <Typography variant="h6">{city.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover this amazing city!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DestinationSuggestions; */
