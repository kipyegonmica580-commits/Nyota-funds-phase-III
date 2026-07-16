import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌧️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌤️';
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p className="weather-description">{weather.weather[0].description.toUpperCase()}</p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <span className="weather-icon">{getWeatherIcon(weather.weather[0].icon)}</span>
          <div className="temperature">
            <span className="temp-value">{Math.round(weather.main.temp)}</span>
            <span className="temp-unit">{tempUnit}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(weather.main.feels_like)}{tempUnit}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{weather.wind.speed} {speedUnit}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">UV Index</span>
            <span className="detail-value">
              {weather.clouds?.all || 'N/A'}%
            </span>
          </div>
        </div>
      </div>

      <div className="weather-extremes">
        <div className="extreme-item">
          <span className="extreme-label">Max Temp</span>
          <span className="extreme-value">{Math.round(weather.main.temp_max)}{tempUnit}</span>
        </div>
        <div className="extreme-item">
          <span className="extreme-label">Min Temp</span>
          <span className="extreme-value">{Math.round(weather.main.temp_min)}{tempUnit}</span>
        </div>
        <div className="extreme-item">
          <span className="extreme-label">Sunrise</span>
          <span className="extreme-value">
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </span>
        </div>
        <div className="extreme-item">
          <span className="extreme-label">Sunset</span>
          <span className="extreme-value">
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;