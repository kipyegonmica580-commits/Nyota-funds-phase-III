import React from 'react';
import './Forecast.css';

const Forecast = ({ forecast, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  // Group forecasts by day
  const dailyForecasts = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        temps: [],
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      };
    }
    dailyForecasts[date].temps.push(item.main.temp);
  });

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
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {Object.entries(dailyForecasts).slice(0, 5).map(([date, data]) => {
          const avgTemp = Math.round(
            data.temps.reduce((a, b) => a + b) / data.temps.length
          );
          const minTemp = Math.round(Math.min(...data.temps));
          const maxTemp = Math.round(Math.max(...data.temps));

          return (
            <div key={date} className="forecast-card">
              <div className="forecast-date">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              <div className="forecast-icon">
                {getWeatherIcon(data.icon)}
              </div>
              <div className="forecast-description">
                {data.description.charAt(0).toUpperCase() + data.description.slice(1)}
              </div>
              <div className="forecast-temps">
                <div className="forecast-temp-row">
                  <span className="label">Avg:</span>
                  <span className="value">{avgTemp}{tempUnit}</span>
                </div>
                <div className="forecast-temp-row">
                  <span className="label">High:</span>
                  <span className="value high">{maxTemp}{tempUnit}</span>
                </div>
                <div className="forecast-temp-row">
                  <span className="label">Low:</span>
                  <span className="value low">{minTemp}{tempUnit}</span>
                </div>
              </div>
              <div className="forecast-details">
                <div className="forecast-detail">
                  <span className="icon">💧</span>
                  <span>{data.humidity}%</span>
                </div>
                <div className="forecast-detail">
                  <span className="icon">💨</span>
                  <span>{data.windSpeed.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;