// src/components/Forecast.jsx
import React from "react";
import { getWeatherIcon } from "./CurrentWeather"; // Re-using the icon logic

const Forecast = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="forecast-card glass-card">
      <h3>5-Day Forecast</h3>
      {data.map((day, index) => (
        <div key={index} className="forecast-item">
          <p className="forecast-day">
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          {getWeatherIcon(day.weather[0].icon, 40)}
          <p className="forecast-temp">
            {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
