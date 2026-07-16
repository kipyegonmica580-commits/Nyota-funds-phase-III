# Weather Dashboard Setup

## Overview

This weather dashboard is a React application that fetches real-time weather data from the OpenWeatherMap API. It includes features like current weather display, 5-day forecasts, saved locations, and temperature unit conversion.

## Prerequisites

- React 18+
- Axios
- OpenWeatherMap API Key (free at https://openweathermap.org/api)

## Installation

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key from your account dashboard

### 2. Setup Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
cd frontend
npm install axios
npm start
```

## Features

### ✅ Implemented

- **Current Weather Display**
  - Temperature, feels-like, humidity, pressure
  - Wind speed and visibility
  - Sunrise and sunset times
  - Min/Max temperatures
  - Weather icons and descriptions

- **5-Day Forecast**
  - Daily temperature averages
  - High/Low temperatures
  - Weather conditions
  - Humidity and wind speed
  - Visual indicators for weather type

- **City Search**
  - Search for any city worldwide
  - Real-time weather updates
  - Error handling for invalid cities

- **Saved Locations**
  - Save favorite locations locally
  - Quick load saved locations
  - Remove saved locations
  - LocalStorage persistence

- **Temperature Units**
  - Toggle between Celsius and Fahrenheit
  - Instant conversion for all values

- **Responsive Design**
  - Mobile-friendly interface
  - Optimized for all screen sizes
  - Touch-friendly buttons

## Usage

### Basic Usage

1. **Search for a City**
   - Enter city name in search bar
   - Click "Search" or press Enter
   - View current weather and forecast

2. **Save a Location**
   - Click "⭐ Save Location" button
   - Location is saved to browser storage
   - Access from "Saved Locations" section

3. **Load Saved Location**
   - Click "📍 Load" on saved location card
   - Weather updates instantly

4. **Change Temperature Unit**
   - Click "°F" or "°C" button in header
   - All temperatures update immediately

### API Integration

The dashboard uses OpenWeatherMap API endpoints:

```javascript
// Current Weather
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apikey}&units={unit}

// 5-Day Forecast
GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apikey}&units={unit}
```

### LocalStorage Structure

Saved locations are stored as:

```json
[
  {
    "name": "New York",
    "country": "US",
    "lat": 40.7128,
    "lon": -74.0060
  }
]
```

## Component Structure

```
WeatherDashboard/
├── WeatherDashboard.js (Main component)
├── SearchBar.js (Search input)
├── WeatherCard.js (Current weather display)
├── Forecast.js (5-day forecast)
├── SavedLocations.js (Saved locations list)
└── styles (CSS files)
```

## API Response Example

```json
{
  "coord": {"lon": -74.006, "lat": 40.7143},
  "weather": [{"id": 800, "main": "Clear", "description": "clear sky"}],
  "main": {
    "temp": 25.5,
    "feels_like": 24.8,
    "temp_min": 20.3,
    "temp_max": 28.9,
    "pressure": 1013,
    "humidity": 65
  },
  "wind": {"speed": 3.5},
  "visibility": 10000,
  "sys": {
    "sunrise": 1689067200,
    "sunset": 1689118800,
    "country": "US"
  },
  "name": "New York"
}
```

## Error Handling

- **Invalid City**: Shows error message and prompt
- **API Error**: Displays user-friendly error message
- **Network Error**: Handles connection issues gracefully
- **Invalid API Key**: Clear error message with setup instructions

## Performance Optimization

- Uses React hooks for state management
- Efficient re-rendering with useEffect
- CSS animations with `transform` and `opacity`
- LocalStorage for instant location loading

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Weather data not loading
- Verify API key is correct
- Check API key has weather permission
- Ensure internet connection is active
- Check browser console for errors

### Saved locations not persisting
- Verify localStorage is enabled in browser
- Check if in private/incognito mode
- Clear browser cache and try again

### Temperature conversion not working
- Refresh the page
- Check browser console for errors
- Verify API key is working

## Future Enhancements

- [ ] Historical weather data
- [ ] Weather alerts and warnings
- [ ] Air quality index
- [ ] Hourly forecast
- [ ] Multiple weather sources
- [ ] Dark mode toggle
- [ ] Weather comparisons
- [ ] Integration with maps API

## Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)

## Support

For issues or questions:
1. Check the [OpenWeatherMap FAQ](https://openweathermap.org/faq)
2. Review React documentation
3. Check browser console for error messages