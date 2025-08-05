// src/components/WeatherDetails.jsx
import React from "react";
import { Wind, Droplet, Thermometer } from "lucide-react";

const WeatherDetails = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-details">
      <div className="detail-item">
        <div className="icon">
          <Thermometer size={20} />
        </div>
        <div>
          <span className="value">{Math.round(data.main.feels_like)}°C</span>
          <p className="label">Feels Like</p>
        </div>
      </div>
      <div className="detail-item">
        <div className="icon">
          <Droplet size={20} />
        </div>
        <div>
          <span className="value">{data.main.humidity}%</span>
          <p className="label">Humidity</p>
        </div>
      </div>
      <div className="detail-item">
        <div className="icon">
          <Wind size={20} />
        </div>
        <div>
          <span className="value">{data.wind.speed.toFixed(1)} m/s</span>
          <p className="label">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
