import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

const countriesList = [
  { country: 'Canada', capitalCity: 'Ottawa' },
  { country: 'Spain', capitalCity: 'Madrid' },
  { country: 'Japan', capitalCity: 'Tokyo' },
  { country: 'Australia', capitalCity: 'Canberra' },
  { country: 'Mexico', capitalCity: 'Mexico City' },
  { country: 'Egypt', capitalCity: 'Cairo' },
];

const Countries = ({ onCountryClick }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updatedCountries = await Promise.all(
          countriesList.map(async (country) => {
            const response = await axios.get(
              `https://api.unsplash.com/search/photos`,
              {
                params: {
                  query: country.country,
                  client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
                  per_page: 1,
                },
              }
            );
            const imageUrl = response.data.results[0]?.urls.small || '';
            return { ...country, image: imageUrl };
          })
        );
        setCountries(updatedCountries);
      } catch (error) {
        console.error('Error fetching images for countries:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {countries.map((country, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            onClick={() => onCountryClick(country.country)} // Trigger onCountryClick with country name
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
              image={country.image}
              alt={country.country}
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
              <Typography variant="h6">{country.country}</Typography>
              <Typography variant="body2">{country.capitalCity}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Countries;
