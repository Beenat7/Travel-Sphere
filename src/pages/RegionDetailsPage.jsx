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
        // Fetch region details and associated countries from GeoNames
        const geoNamesResponse = await axios.get(`http://api.geonames.org/searchJSON`, {
          params: {
            q: regionName,
            featureCode: 'RGN',
            maxRows: 1,
            username: process.env.REACT_APP_GEONAMES_USERNAME,
          },
        });

        const regionData = geoNamesResponse.data.geonames[0]; // Use the first region result
        if (regionData) {
          setRegionDetails({
            name: regionData.name || 'Unknown',
            population: regionData.population || 'Unknown',
            latitude: regionData.lat,
            longitude: regionData.lng,
          });

          // Fetch countries for the region
          const countriesResponse = await axios.get(`http://api.geonames.org/searchJSON`, {
            params: {
              q: regionData.name,
              featureCode: 'PCLI', // Feature code for countries
              maxRows: 3, // Limit to 3 countries
              username: process.env.REACT_APP_GEONAMES_USERNAME,
            },
          });

          setCountries(countriesResponse.data.geonames.map((country) => country.name));
        } else {
          console.warn(`No region details found for: ${regionName}`);
          setRegionDetails(null);
        }
      } catch (error) {
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
              position: 'absolute',
              top: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#F4A300',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' },
              padding: '0 20px',
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
              justifyContent: 'space-around',
            }}
          >
            {/* Region Details Card */}
            {regionDetails && (
              <Grid item xs={12} sm={6} md={5}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Region Information
                    </Typography>
                    <Typography>Population: {regionDetails.population}</Typography>
                    <Typography>Latitude: {regionDetails.latitude}</Typography>
                    <Typography>Longitude: {regionDetails.longitude}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Countries Card */}
            {countries.length > 0 && (
              <Grid item xs={12} sm={6} md={5}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Countries in {regionName}
                    </Typography>
                    {countries.map((country, index) => (
                      <Typography key={index}>{country}</Typography>
                    ))}
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
