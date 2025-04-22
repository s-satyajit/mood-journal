import React from 'react';
import { WiDaySunny, WiRain, WiCloudy } from 'react-icons/wi';

export default function WeatherDisplay({ weather }) {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WiDaySunny className="text-4xl" />;
      case 'rain':
        return <WiRain className="text-4xl" />;
      default:
        return <WiCloudy className="text-4xl" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {weather ? (
        <div className="flex items-center gap-4">
          {getWeatherIcon(weather.condition)}
          <div>
            <p className="text-xl font-semibold">{weather.temp}°C</p>
            <p className="text-gray-600">{weather.location}</p>
          </div>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}