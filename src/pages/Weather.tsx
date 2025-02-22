import React from 'react';
import { Header } from '../components/Header';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Weather() {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const weatherData = {
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
    },
    forecast: [
      { day: 'Mon', temp: 29, condition: 'Sunny' },
      { day: 'Tue', temp: 27, condition: 'Cloudy' },
      { day: 'Wed', temp: 26, condition: 'Rain' },
      { day: 'Thu', temp: 28, condition: 'Sunny' },
      { day: 'Fri', temp: 27, condition: 'Cloudy' },
    ],
    alerts: [
      {
        type: 'Rain Alert',
        message: 'Heavy rainfall expected in the next 48 hours',
        severity: 'moderate',
      },
    ],
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'cloudy':
        return <Cloud className="w-8 h-8" />;
      case 'rain':
        return <CloudRain className="w-8 h-8" />;
      default:
        return <Sun className="w-8 h-8" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Current Weather */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Current Weather
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(weatherData.current.condition)}
                  <div>
                    <div className="text-4xl font-bold text-gray-800 dark:text-white">
                      {weatherData.current.temperature}°C
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {weatherData.current.condition}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Wind className="w-5 h-5" />
                    <span>{weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Thermometer className="w-5 h-5" />
                    <span>{weatherData.current.humidity}% Humidity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Alerts */}
            {weatherData.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 p-4 rounded"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CloudRain className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      {alert.type}
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      {alert.message}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 5-Day Forecast */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-gray-600 dark:text-gray-300 mb-2">{day.day}</div>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">
                      {day.temp}°C
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}