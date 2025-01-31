import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

const citiesList = [
  { name: 'Berlin', country: 'Germany' },
  { name: 'Dubai', country: 'UAE' },
  { name: 'Washington', country: 'United States' },
  { name: 'Rio de Janeiro', country: 'Brazil' },
  { name: 'Cape Town', country: 'South Africa' },
  { name: 'Seoul', country: 'South Korea' },
];

const Cities = ({ onCityClick }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updatedCities = await Promise.all(
          citiesList.map(async (city) => {
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
        setCities(updatedCities);
      } catch (error) {
        console.error('Error fetching images for cities:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {cities.map((city, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            onClick={() => onCityClick(city.name)} // Trigger onCityClick with city name
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
              image={city.image}
              alt={city.name}
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
              <Typography variant="h6">{city.name}</Typography>
              <Typography variant="body2">{city.country}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cities;
