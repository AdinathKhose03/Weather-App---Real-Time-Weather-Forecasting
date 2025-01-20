import React, { useState } from 'react';
import './App.css'; // Create a separate CSS file for styling
import { motion } from 'framer-motion'; // Importing Framer Motion for animations


const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "974cd65bccb54a268c692456251901";

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city.');
      setWeather(null);
      return;
    }
    setError('');

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <motion.h1 
        className="title" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        Weather App
      </motion.h1>
      <motion.div 
        className="input-container"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button onClick={fetchWeather} className="fetch-button">Get Weather</button>
      </motion.div>
      {error && (
        <motion.p 
          className="error-message"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}
      {weather && (
        <motion.div 
          className="weather-info"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
          <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.current.wind_kph} kph</p>
          <p><strong>Feels Like:</strong> {weather.current.feelslike_c}°C</p>
          <p><strong>UV Index:</strong> {weather.current.uv}</p>
          <p><strong>Air Quality (PM2.5):</strong> {weather.current.air_quality.pm2_5.toFixed(2)} µg/m³</p>
          <p><strong>Air Quality (PM10):</strong> {weather.current.air_quality.pm10.toFixed(2)} µg/m³</p>
        </motion.div>
      )}
    </div>
  );
};

export default App;