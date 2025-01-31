import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardActionArea, Typography, Box,CircularProgress  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ImageDisplay = ({ cityName, images }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    // Simulate loading time (if applicable)
    useEffect(() => {
      if (images.length > 0 || !cityName) {
        setLoading(false); // Stop loading when images are fetched or no cityName
      }
    }, [images, cityName]);

  // Handle city card click to navigate to city details page
  const handleCityClick = (cityName) => {
    navigate(`/city/${cityName}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {loading ? (
        // Show CircularProgress while loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : images.length > 0 ? (
        // Display images grid
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCityClick(cityName)} // Use the cityName passed as prop
                sx={{ position: 'relative', overflow: 'hidden' }}
              >
                <CardActionArea sx={{ position: 'relative' }}>
                  {/* Display image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={image.urls.small}
                    alt={image.alt_description || 'City image'}
                  />
                  {/* Always show text */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: '#f4a300',
                      padding: '10px',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body2" 
                    /*   sx={{
                        fontWeight: 'bold',
                        color:'white',
                        bgcolor: '#f4a300', // Set text color to #f4a300
                      }} */
                    >
                       click me to know about {cityName}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Show no images found message
        <Typography variant="h6" textAlign="center">
          No images found for {cityName}. Try searching for another city.
        </Typography>
      )}
    </Box>
  );
};

export default ImageDisplay;
