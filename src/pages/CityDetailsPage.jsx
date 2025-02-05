import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const CityDetailsPage = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      setLoading(true);

      try {
        // Fetch weather data
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: cityName,
              units: 'metric',
              appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            },
          }
        );
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error.response?.data || error.message);
        setWeather(null);
      }

      try {
        // Fetch city details from OpenCage Geocoder
        const openCageResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
          params: {
            q: cityName,
            key: process.env.REACT_APP_OPENCAGE_API_KEY,
          },
        });
        
        const cityData = openCageResponse.data.results[0];
        if (cityData) {
          setCityDetails({
            countryName: cityData.components.country || 'Unknown',
            currency: cityData.annotations.currency.name || 'Unknown',
            callingCode: cityData.annotations.callingcode || 'unknown',
            timezone: cityData.annotations.timezone.offset_string || 'Unknown',
          });
        } else {
          console.warn(`No city details found for: ${cityName}`);
          setCityDetails(null);
        }
      } catch (error) {
        console.error('Error fetching city details:', error.response?.data || error.message);
        setCityDetails(null);
      }

      try {
        // Fetch city image from Unsplash
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: cityName,
              per_page: 1,
              client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            },
          }
        );
        if (unsplashResponse.data.results.length > 0) {
          setImage(unsplashResponse.data.results[0]);
        } else {
          console.warn(`No images found for: ${cityName}`);
          setImage(null);
        }
      } catch (error) {
        console.error('Error fetching Unsplash data:', error.response?.data || error.message);
        setImage(null);
      }

      setLoading(false);
    };

    fetchCityData();
  }, [cityName]);
const sunrise = weather?.sys?.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : "N/A";
const sunset = weather?.sys?.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : "N/A";



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
              top: '15px', // 3px margin from top
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#F4A300',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' }, // Responsive font size
              padding: '0 20px',
              flexDirection: { sm: 'row' },
            }}
            >
            Explore {cityName}
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


            {/* Weather Card */}
            {weather && (
              <Grid item xs={12} sm={6} md={5} >
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <CardContent>
                    <Typography variant= "h6"  sx={{ mb: 2
                    
                  }}>
                       Weather
                    </Typography>
                    <Typography>Temperature: {weather.main.temp}°C</Typography>
                    <Typography>Condition: {weather.weather[0].description}</Typography>  
                    <Typography>Sunrise: {sunrise}</Typography>
                    <Typography>Sunset: {sunset}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* GeoNames Card */}
            {cityDetails && (
              <Grid item xs={12} sm={6} md={5}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2
          
                     }}>
                      City Information
                    </Typography>
                    <Typography>Country: {cityDetails.countryName}</Typography>
                    <Typography>currency: {cityDetails.currency}</Typography>
                    <Typography>callingCode: {cityDetails.callingCode}</Typography>
                    <Typography>Time Zone: {cityDetails.timezone}</Typography>
                    
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

export default CityDetailsPage;















/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const CityDetailsPage = () => {
  const { cityName } = useParams(); // Get cityName from route parameters
  const [weather, setWeather] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      setLoading(true);
      try {
        // Fetch weather data
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: cityName,
              units: 'metric',
              appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            },
          }
        );
        setWeather(weatherResponse.data);

        // Fetch city details from GeoDB
        const geoDbResponse = await axios.get(
          `${process.env.REACT_APP_GEODB_BASE_URL}/cities`,
          {
            params: { namePrefix: cityName, limit: 1 },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_GEODB_API_KEY,
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );
        setCityDetails(geoDbResponse.data.data[0]);

        // Fetch city image from Unsplash
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: cityName,
              per_page: 1,
              client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            },
          }
        );
        setImage(unsplashResponse.data.results[0]);
      } catch (error) {
        console.error('Error fetching city details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityName]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {image && (
        <Box
          sx={{
            backgroundImage: `url(${image.urls.regular})`,
            height: '400px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '15px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
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
            variant="h2"
            sx={{
              color: 'white',
              zIndex: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              textAlign: 'center',
            }}
          >
            {cityDetails?.city}, {cityDetails?.country}
          </Typography>
        </Box>
      )}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        
        {weather && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Current Weather
                </Typography>
                <Typography>Temperature: {weather.main.temp}°C</Typography>
                <Typography>Condition: {weather.weather[0].description}</Typography>
                <Typography>Humidity: {weather.main.humidity}%</Typography>
                <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        
        {cityDetails && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  City Information
                </Typography>
                <Typography>Population: {cityDetails.population}</Typography>
                <Typography>Latitude: {cityDetails.latitude}</Typography>
                <Typography>Longitude: {cityDetails.longitude}</Typography>
                <Typography>Timezone: {cityDetails.timezone}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CityDetailsPage;
 */