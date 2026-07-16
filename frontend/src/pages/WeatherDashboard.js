import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDashboard.css';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import Forecast from '../components/Forecast';
import SavedLocations from '../components/SavedLocations';

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('New York');
  const [savedLocations, setSavedLocations] = useState([]);
  const [unit, setUnit] = useState('metric'); // metric for Celsius, imperial for Fahrenheit

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo'; // Replace with your OpenWeatherMap API key
  const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

  // Load saved locations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedWeatherLocations');
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }
  }, []);

  // Fetch weather data
  const fetchWeather = async (cityName = city) => {
    setLoading(true);
    setError('');

    try {
      // Current weather
      const weatherResponse = await axios.get(
        `${WEATHER_API_URL}/weather`,
        {
          params: {
            q: cityName,
            appid: API_KEY,
            units: unit,
          },
        }
      );

      setWeather(weatherResponse.data);
      setCity(cityName);

      // 5-day forecast
      const forecastResponse = await axios.get(
        `${WEATHER_API_URL}/forecast`,
        {
          params: {
            q: cityName,
            appid: API_KEY,
            units: unit,
          },
        }
      );

      setForecast(forecastResponse.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to fetch weather data. Please check the city name.'
      );
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchCity) => {
    fetchWeather(searchCity);
  };

  // Save location
  const handleSaveLocation = () => {
    if (weather && !savedLocations.some((loc) => loc.name === weather.name)) {
      const newLocation = {
        name: weather.name,
        country: weather.sys.country,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      };

      const updated = [...savedLocations, newLocation];
      setSavedLocations(updated);
      localStorage.setItem('savedWeatherLocations', JSON.stringify(updated));
    }
  };

  // Remove saved location
  const handleRemoveLocation = (locationName) => {
    const updated = savedLocations.filter((loc) => loc.name !== locationName);
    setSavedLocations(updated);
    localStorage.setItem('savedWeatherLocations', JSON.stringify(updated));
  };

  // Load location
  const handleLoadLocation = (locationCity) => {
    fetchWeather(locationCity);
  };

  // Toggle temperature unit
  const handleToggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    if (weather) {
      fetchWeather(city);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-dashboard">
      <div className="container">
        <header className="weather-header">
          <h1>🌤️ Weather Dashboard</h1>
          <button className="unit-toggle" onClick={handleToggleUnit}>
            {unit === 'metric' ? '°F' : '°C'}
          </button>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && <div className="alert alert-error">{error}</div>}

        {loading && <div className="spinner"></div>}

        {weather && !loading && (
          <div className="weather-content">
            <div className="main-section">
              <WeatherCard weather={weather} unit={unit} />
              <button className="btn btn-primary" onClick={handleSaveLocation}>
                ⭐ Save Location
              </button>
            </div>

            {forecast && (
              <div className="forecast-section">
                <Forecast forecast={forecast} unit={unit} />
              </div>
            )}
          </div>
        )}

        {savedLocations.length > 0 && (
          <SavedLocations
            locations={savedLocations}
            onLoad={handleLoadLocation}
            onRemove={handleRemoveLocation}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;