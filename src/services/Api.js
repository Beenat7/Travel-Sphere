import axios from 'axios';

const REST_COUNTRIES_API_URL = 'https://restcountries.com/v3.1';
const OPENCAGE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';

// Predefined regions (no need for API calls)
const allRegions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

// Fetch all countries once and store them
let allCountries = [];

const fetchAllCountries = async () => {
  if (allCountries.length > 0) return allCountries; // Use cached data if available

  try {
    const response = await axios.get(`${REST_COUNTRIES_API_URL}/all`);
    allCountries = response.data.map(country => country.name.common); // Store for later use
    return allCountries;
  } catch (error) {
    console.error('Error fetching all countries:', error.message);
    return [];
  }
};

// Fetch country suggestions (up to 10)
const getCountrySuggestions = async (input) => {
  const countries = await fetchAllCountries();
  return countries
    .filter(country => country.toLowerCase().startsWith(input.toLowerCase()))
    .slice(0, 10);
};

// Fetch region suggestions (predefined list)
const getRegionSuggestions = (input) => {
  return allRegions
    .filter(region => region.toLowerCase().startsWith(input.toLowerCase()))
    .slice(0, 10);
};

// Main function to fetch suggestions based on category
export const fetchSuggestions = async (input, category) => {
  if (!input.trim()) return [];

  try {
    if (category === 'City') {
      // OpenCage API for city suggestions
      const response = await axios.get(OPENCAGE_API_URL, {
        params: {
          q: input,
          key: process.env.REACT_APP_OPENCAGE_API_KEY,
          limit: 10,
        },
      });
      return response.data.results.map((item) => item.formatted);
    } 
    else if (category === 'Country') {
      return await getCountrySuggestions(input);
    } 
    else if (category === 'Region') {
      return getRegionSuggestions(input);
    } 
    else {
      return [];
    }
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

