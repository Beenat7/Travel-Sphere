import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const RegionDetailsPage = () => {
  const { regionName } = useParams();
  const [regionDetails, setRegionDetails] = useState(null);
  const [countries, setCountries] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegionData = async () => {
      setLoading(true);
      try {
        // Fetch region details and countries from REST Countries API
        const regionResponse = await axios.get(`https://restcountries.com/v3.1/region/${regionName}`);
        const countryData = regionResponse.data.slice(0, 6); // Get first 6 countries

        setCountries(
          countryData.map(country => ({
            name: country.name.common,
            flag: country.flags.svg,
            /* population: country.population, */
            capital: country.capital?.[0] || 'Unknown',
          }))
        );

       
      }catch (error) {
        console.error('Error fetching region details:', error.response?.data || error.message);
        setRegionDetails(null);
      }

     


      try {
        // Fetch region image from Unsplash
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: regionName,
              per_page: 1,
              client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            },
          }
        );
        if (unsplashResponse.data.results.length > 0) {
          setImage(unsplashResponse.data.results[0]);
        } else {
          console.warn(`No images found for: ${regionName}`);
          setImage(null);
        }
      } catch (error) {
        console.error('Error fetching Unsplash data:', error.response?.data || error.message);
        setImage(null);
      }

      setLoading(false);
    };

    fetchRegionData();
  }, [regionName]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Unsplash Banner */}
      {image && (
        <Box
          sx={{
            height: '80vh',
            backgroundImage: `url(${image.urls.regular})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          ></Box>

                <Typography
                 variant="h4"
                 sx={{
                   zIndex: 2,
                   color: '#F4A300',
                   textAlign: 'center',
                   fontWeight: 'bold',
                   position: 'absolute', // Ensure it stays fixed
                   top: '10%', // Vertically center
                   left: '50%', // Horizontally center
                   transform: 'translate(-50%, -50%)', // Fine-tuning the centering
                 }}
               >
            Discover {regionName}
          </Typography>

          {/* Cards Over Banner */}
          <Grid
            container
            spacing={2}
            sx={{
              zIndex: 2,
              width: '70%',
              p:3,
              justifyContent: 'space-around',
            }}
          >
   

            {/* Countries Card */}
            {countries.length > 0 && (
              <Grid item xs={12} sm={12} md={8}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <CardContent>
                <Typography variant="h6">Countries in {regionName}</Typography>
                <Grid container spacing={2}>
                  {countries.map((country, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                        <img src={country.flag} alt={country.name} width={50} height={30} />
                        <Typography>{country.name}</Typography>
                        <Typography variant="body2">Capital: {country.capital}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
                  
                  
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default RegionDetailsPage;
