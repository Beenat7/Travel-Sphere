import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CityDetailsPage from '../pages/CityDetailsPage';
import CountryDetailsPage from '../pages/CountryDetailsPage';
import RegionDetailsPage from '../pages/RegionDetailsPage';
import Cities from '../components/Cities';
import Countries from '../components/Countries';
import Regions from '../components/Regions';
import { useNavigate } from 'react-router-dom';

const AppRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      {/* Route for HomePage */}
      <Route path="/" element={<HomePage />} />
      <Route 
  path="/countries" 
  element={<Countries onCountryClick={(countryName) => navigate(`/country/${countryName}`)} />} 
/>
<Route 
  path="/cities" 
  element={<Cities onCityClick={(cityName) => navigate(`/city/${cityName}`)} />} 
/>
<Route 
  path="/regions" 
  element={<Regions onRegionClick={(regionName) => navigate(`/region/${regionName}`)} />} 
/>




{/* 
      <Route path="/cities" element={<Cities />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/regions" element={<Regions />} /> */}

      {/* Route for CityDetailsPage */}
      <Route path="/city/:cityName" element={<CityDetailsPage />} />
      {/* Route for CountryDetailsPage */}
      <Route path="/country/:countryName" element={<CountryDetailsPage />} />
      {/* Route for RegionDetailsPage */}
      <Route path="/region/:regionName" element={<RegionDetailsPage />} />

     

    </Routes>
  );
};

export default AppRoutes;
