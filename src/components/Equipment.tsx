import React, { useState } from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Equipment } from '../types';

interface EquipmentProps {
  equipment: Equipment[];
}

export function Equipment({ equipment }: EquipmentProps) {
  const { t } = useTranslation();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  return (
    <div className="space-y-6">
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
                <span className="text-2xl font-bold text-green-600">₹{item.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{item.manufacturer}</span>
              </div>
              
              <button
                onClick={() => setSelectedEquipment(item)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Info className="w-5 h-5" />
                <span>{t('actions.details')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Equipment Details Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedEquipment.name}</h2>
              <button
                onClick={() => setSelectedEquipment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ExternalLink className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedEquipment.image}
              alt={selectedEquipment.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-gray-700">{t('equipment.manufacturer')}</h3>
                <p>{selectedEquipment.manufacturer}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">{t('equipment.category')}</h3>
                <p>{selectedEquipment.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">{t('equipment.price')}</h3>
                <p className="text-green-600 font-bold">₹{selectedEquipment.price.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">{t('equipment.stock')}</h3>
                <p>{selectedEquipment.stock} units available</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">{t('equipment.description')}</h3>
              <p className="text-gray-600">{selectedEquipment.description}</p>
            </div>

            <button
              onClick={() => setSelectedEquipment(null)}
              className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('actions.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}