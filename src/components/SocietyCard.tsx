import React from 'react';
import { MapPin, Phone, Clock, Navigation, Star, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Society } from '../types';
import { StockStatus } from './StockStatus';
import { WeatherWidget } from './WeatherWidget';

interface SocietyCardProps {
  society: Society;
}

export function SocietyCard({ society }: SocietyCardProps) {
  const { t } = useTranslation();
  
  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${society.latitude},${society.longitude}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{society.name}</h2>
        {society.rating && (
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-gray-600">{society.rating.toFixed(1)}</span>
            <span className="text-gray-400">({society.reviewCount})</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-2">
          <MapPin className="w-5 h-5 text-green-600 mt-1" />
          <p className="text-gray-600">{society.address}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-green-600" />
          <p className="text-gray-600">{society.phone}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-green-600" />
          <p className="text-gray-600">{society.openingHours}</p>
        </div>
      </div>

      {society.weatherInfo && (
        <WeatherWidget weather={society.weatherInfo} className="mb-4" />
      )}

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">{t('inventory.available')}</h3>
        <div className="space-y-2">
          {society.inventory.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <span className="text-gray-700">{item.name}</span>
                <StockStatus quantity={item.quantity} unit={item.unit} />
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <p className="text-green-600 font-medium">₹{item.price}/{item.unit}</p>
                  {item.subsidyPrice && (
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Subsidy: ₹{item.subsidyPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span>Market Avg: ₹{(item.price * 1.2).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {society.schemes && society.schemes.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <h3 className="font-semibold mb-2">{t('schemes.available')}</h3>
          <div className="space-y-2">
            {society.schemes.map(scheme => (
              <div key={scheme.id} className="bg-green-50 p-3 rounded-md">
                <h4 className="font-medium text-green-800">{scheme.title}</h4>
                <p className="text-sm text-gray-600">{scheme.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleNavigate}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Navigation className="w-4 h-4 text-white" />
          <span>{t('actions.navigate')}</span>
        </button>
        
        <button
          onClick={() => {}} // TODO: Implement review modal
          className="flex-1 bg-white text-green-600 border border-green-600 py-2 px-4 rounded-md hover:bg-green-50 transition-colors"
        >
          {t('actions.review')}
        </button>
      </div>
    </div>
  );
}