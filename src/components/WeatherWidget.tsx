import React from 'react';
import { Cloud, Sun, CloudRain, Droplets } from 'lucide-react';
import type { WeatherInfo } from '../types';
import { useTranslation } from 'react-i18next';

interface WeatherWidgetProps {
  weather: WeatherInfo;
  className?: string;
}

export function WeatherWidget({ weather, className = '' }: WeatherWidgetProps) {
  const { t } = useTranslation();

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'cloudy':
        return <Cloud className="w-6 h-6" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6" />;
      default:
        return <Sun className="w-6 h-6" />;
    }
  };

  return (
    <div className={`bg-blue-50 p-4 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getWeatherIcon(weather.condition)}
          <span className="text-lg font-medium">{weather.temperature}°C</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Droplets className="w-4 h-4" />
          <span>{weather.humidity}%</span>
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto py-2">
        {weather.forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center min-w-[60px]">
            <span className="text-sm text-gray-500">
              {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
            </span>
            {getWeatherIcon(day.condition)}
            <span className="text-sm">{day.temperature}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}