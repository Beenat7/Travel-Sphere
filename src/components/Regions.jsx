import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

const regionsList = [
 /*  { region: 'East Africa', headquarter: 'Addis Ababa' },*/
 { region: 'Europe', headquarter: 'Brussels' },
 { region: 'North America', headquarter: 'Washington, D.C.' },
 { region: 'Oceania', headquarter: 'Sydney' },
  
  { region: 'Africa', headquarter: 'Addis Ababa' },
  { region: 'Asia', headquarter: 'Beijing' }, 
  { region: 'South America', headquarter: 'Buenos Aires' },
];

const Regions = ({ onRegionClick }) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updatedRegions = await Promise.all(
          regionsList.map(async (region) => {
            const response = await axios.get(
              `https://api.unsplash.com/search/photos`,
              {
                params: {
                  query: region.region,
                  client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
                  per_page: 1,
                },
              }
            );
            const imageUrl = response.data.results[0]?.urls.small || '';
            return { ...region, image: imageUrl };
          })
        );
        setRegions(updatedRegions);
      } catch (error) {
        console.error('Error fetching images for regions:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {regions.map((region, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            onClick={() => onRegionClick(region.region)} // Trigger onRegionClick with region name
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
              image={region.image}
              alt={region.region}
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
              <Typography variant="h6">{region.region}</Typography>
              <Typography variant="body2">{region.headquarter}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Regions;
