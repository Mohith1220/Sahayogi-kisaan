import React from 'react';
import { ShoppingCart, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Equipment } from '../types';

interface EquipmentProps {
  equipment: Equipment[];
  onAddToCart: (equipmentId: string) => void;
}

export function Equipment({ equipment, onAddToCart }: EquipmentProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
              <span className="text-sm text-gray-500">{item.manufacturer}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                item.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {}}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <Info className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => onAddToCart(item.id)}
                  disabled={item.stock === 0}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{t('equipment.addToCart')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}