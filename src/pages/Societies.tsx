import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SocietyCard } from '../components/SocietyCard';
import { societies } from '../data/societies';
import { MapPin, AlertCircle } from 'lucide-react';
import type { Society } from '../types';
import { useTheme } from '../hooks/useTheme';

export function Societies() {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [nearestSocieties, setNearestSocieties] = useState<Society[]>(societies);
  const [filteredSocieties, setFilteredSocieties] = useState<Society[]>(societies);
  const [displayCount, setDisplayCount] = useState(9);
  const { isDark } = useTheme();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setLocationError('');
        },
        (error) => {
          let errorMessage = 'Unable to get your location.';
          if (error.code === 1) {
            errorMessage = 'Please enable location access to see nearby societies. For now, showing all societies.';
          } else if (error.code === 2) {
            errorMessage = 'Location information is unavailable. Showing all societies.';
          } else if (error.code === 3) {
            errorMessage = 'Location request timed out. Showing all societies.';
          }
          setLocationError(errorMessage);
          console.log('Location access error:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Showing all societies.');
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    if (userLocation) {
      const sortedSocieties = [...societies].sort((a, b) => {
        const distA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.latitude,
          a.longitude
        );
        const distB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude
        );
        return distA - distB;
      });
      setNearestSocieties(sortedSocieties);
      setFilteredSocieties(sortedSocieties);
    }
  }, [userLocation]);

  const handleSearch = (results: Society[]) => {
    setFilteredSocieties(results);
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {userLocation ? 'Nearest Societies' : 'All Societies'}
              </h2>
            </div>

            {locationError && (
              <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 p-4 rounded-md">
                <AlertCircle className="w-5 h-5" />
                <p>{locationError}</p>
              </div>
            )}

            <SearchBar societies={nearestSocieties} onSearch={handleSearch} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSocieties.slice(0, displayCount).map(society => (
              <SocietyCard key={society.id} society={society} />
            ))}
          </div>

          {displayCount < filteredSocieties.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors"
              >
                Load More Societies
              </button>
            </div>
          )}
        </main>

        <footer className="bg-green-800 dark:bg-green-900 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Karnataka Rural Societies Directory</p>
          </div>
        </footer>
      </div>
    </div>
  );
}