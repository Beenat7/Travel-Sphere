import axios from 'axios';

// GeoNames API
const GEONAMES_USERNAME = process.env.REACT_APP_GEONAMES_USERNAME;

// Fetch suggestions from GeoNames
export const fetchSuggestions = async (input, category) => {
  if (!input.trim()) return [];
  
  let featureClass = '';
  switch (category) {
    case 'Country':
      featureClass = 'A'; // Administrative areas
      break;
    case 'City':
      featureClass = 'P'; // Populated places
      break;
    case 'Region':
      featureClass = 'L'; // Locations like parks, forests
      break;
    default:
      return [];
  }

  try {
    const response = await axios.get('http://api.geonames.org/searchJSON', {
      params: {
        name_startsWith: input,
        featureClass,
        maxRows: 10,
        username: GEONAMES_USERNAME,
      },
    });
    return response.data.geonames.map((item) => item.name);
  } catch (error) {
    console.error('Error fetching suggestions:', error.message);
    return [];
  }
};


// OpenWeatherMap API
const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Unsplash API
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

// Fetch city info from GeoNames
export const fetchCityInfo = async (cityName) => {
  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON`, {
      params: {
        q: cityName,
        maxRows: 1,
        username: GEONAMES_USERNAME,
      },
    });
    const cityData = response.data.geonames[0]; // Return the first matching city
    return cityData || {}; 
  } catch (error) {
    console.error('Error in fetchCityInfo:', error.message);
    return {};
  }
};

// Fetch weather info from OpenWeatherMap
export const fetchWeatherInfo = async (cityName) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: cityName, appid: OPENWEATHER_API_KEY, units: 'metric' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error in fetchWeatherInfo:', error.message);
    return null;
  }
};

// Fetch city images from Unsplash
export const fetchCityImages = async (cityName) => {
  try {
    const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
      params: { query: cityName, client_id: UNSPLASH_ACCESS_KEY, per_page: 1 },
    });
    return response.data.results[0] || {}; // Return the first image
  } catch (error) {
    console.error('Error in fetchCityImages:', error.message);
    return {};
  }
};

