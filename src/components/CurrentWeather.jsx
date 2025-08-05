// src/components/CurrentWeather.jsx
import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

const getWeatherIcon = (iconCode, size = 80) => {
  const iconMap = {
    "01d": <Sun size={size} className="weather-icon" />,
    "01n": <Sun size={size} className="weather-icon" />,
    "02d": <Cloud size={size} className="weather-icon" />,
    "02n": <Cloud size={size} className="weather-icon" />,
    "03d": <Cloud size={size} className="weather-icon" />,
    "03n": <Cloud size={size} className="weather-icon" />,
    "04d": <Cloud size={size} className="weather-icon" />,
    "04n": <Cloud size={size} className="weather-icon" />,
    "09d": <CloudRain size={size} className="weather-icon" />,
    "09n": <CloudRain size={size} className="weather-icon" />,
    "10d": <CloudRain size={size} className="weather-icon" />,
    "10n": <CloudRain size={size} className="weather-icon" />,
    "11d": <CloudLightning size={size} className="weather-icon" />,
    "11n": <CloudLightning size={size} className="weather-icon" />,
    "13d": <CloudSnow size={size} className="weather-icon" />,
    "13n": <CloudSnow size={size} className="weather-icon" />,
    "50d": <Cloud size={size} className="weather-icon" />,
    "50n": <Cloud size={size} className="weather-icon" />,
  };
  return iconMap[iconCode] || <Sun size={size} className="weather-icon" />;
};

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <div className="location">
        <h2>{data.name}</h2>
        <p>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="current-temp">
        {getWeatherIcon(data.weather[0].icon)}
        <span className="temp">{Math.round(data.main.temp)}°C</span>
      </div>
      <p className="weather-description">{data.weather[0].description}</p>
    </>
  );
};

export { getWeatherIcon };
export default CurrentWeather;
