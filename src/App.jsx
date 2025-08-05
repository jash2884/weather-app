// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  fetchWeatherData,
  fetchBackgroundImages,
} from "./services/weatherService";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";

// Default image to show on load or if the API fails
const DEFAULT_BACKGROUND =
  "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState([
    DEFAULT_BACKGROUND,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for fetching weather and background images when the city changes
  useEffect(() => {
    const loadAppData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch weather data
        const { weatherData, forecastData } = await fetchWeatherData(city);
        setWeather({ current: weatherData, forecast: forecastData });

        // Determine image query based on weather
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        const imageQuery = `${weatherCondition} sky`;

        // Fetch background images
        const images = await fetchBackgroundImages(imageQuery);
        if (images && images.length > 0) {
          setBackgroundImages(images);
        } else {
          setBackgroundImages([DEFAULT_BACKGROUND]);
        }
        setCurrentImageIndex(0); // Reset image index on new search
      } catch (err) {
        setError(err.message);
        setWeather(null);
        setBackgroundImages([DEFAULT_BACKGROUND]); // Fallback on error
      } finally {
        setLoading(false);
      }
    };

    loadAppData();
  }, [city]);

  // Effect for cycling through background images
  useEffect(() => {
    if (backgroundImages.length <= 1) return; // Don't start interval if there's only one image

    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 10 seconds

    // Cleanup function to clear the interval when the component unmounts or images change
    return () => clearInterval(intervalId);
  }, [backgroundImages]);

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
    >
      <div className="overlay"></div>
      <main className="weather-app">
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="status-container glass-card">
            <div className="loader"></div>
          </div>
        )}

        {error && (
          <div className="status-container glass-card">
            <p className="error-message">{error}</p>
          </div>
        )}

        {weather && !loading && !error && (
          <>
            <div className="current-weather-card glass-card">
              <CurrentWeather data={weather.current} />
              <WeatherDetails data={weather.current} />
            </div>
            <Forecast data={weather.forecast} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
