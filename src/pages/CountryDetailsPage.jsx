import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const CountryDetailsPage = () => {
  const { countryName } = useParams();
  const [weather, setWeather] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);

      try {
        // Fetch weather for capital city (if available)
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: countryName,
              units: 'metric',
              appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            },
          }
        );
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(null);
      }

      try {
        // Fetch country details from Rest Countries API
        const restCountriesResponse = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        const countryData = restCountriesResponse.data[0];
        if (countryData) {
          setCountryDetails({
            countryName: countryData.name.common,
            population: countryData.population.toLocaleString() || 'Unknown',
            capital: countryData.capital ? countryData.capital[0] : 'Unknown',
            timeZone: countryData.timezones ? countryData.timezones[0] : 'Unknown',
            callingCode: countryData.idd.root + (countryData.idd.suffixes ? countryData.idd.suffixes[0] : ''),
            flag: countryData.flags.png,
          });
        } else {
          console.warn(`No details found for: ${countryName}`);
          setCountryDetails(null);
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
        setCountryDetails(null);
      }

      try {
        // Fetch country image
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: countryName,
              per_page: 1,
              client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            },
          }
        );
        setImage(unsplashResponse.data.results[0] || null);
      } catch (error) {
        console.error('Error fetching image:', error);
        setImage(null);
      }

      setLoading(false);
    };

    fetchCountryData();
  }, [countryName]);

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
            Explore {countryName}
          </Typography>
          <Grid container spacing={2} sx={{ zIndex: 2, width: '70%', justifyContent: 'space-around' }}>
            {weather && (
              <Grid item xs={12} sm={6} md={5}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>

                  
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Weather
                    </Typography>
                    <Typography>Temperature: {weather.main.temp}°C</Typography>
                    <Typography>Condition: {weather.weather[0].description}</Typography>
                    <Typography>Humidity: {weather.main.humidity}%</Typography>
                    <Typography>Wind Speed: {weather.wind.speed} m/s</Typography> 
                    <Typography>Pressure: {weather.main.pressure} hPa</Typography>
                    <Typography>Sunrise: {sunrise}</Typography>
                    <Typography>Sunset: {sunset}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {countryDetails && (
              <Grid item xs={12} sm={6} md={5}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Details
                    </Typography>
                    <Typography>Country: {countryDetails.countryName}</Typography>
                    <Typography>Population: {countryDetails.population}</Typography>
                    <Typography>Capital: {countryDetails.capital}</Typography>
                    <Typography>Time Zone: {countryDetails.timeZone}</Typography>
                    <Typography>Calling Code: {countryDetails.callingCode}</Typography>
                    <Typography sx={{ pt:2}}>Flag : <img src={countryDetails.flag} alt="Country Flag" style={{ width:"60px" , }}  /></Typography>
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

export default CountryDetailsPage;
