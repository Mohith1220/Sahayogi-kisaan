import React from 'react';
import { Header } from '../components/Header';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { Equipment as EquipmentComponent } from '../components/Equipment';
import type { Equipment as EquipmentType } from '../types';
import toast from 'react-hot-toast';

const sampleEquipment: EquipmentType[] = [
  {
    id: '1',
    name: 'Tractor',
    description: 'Modern farming tractor with advanced features',
    price: 750000,
    category: 'Heavy Machinery',
    image: 'https://images.unsplash.com/photo-1605338198563-840f348cb4db?w=800',
    stock: 5,
    manufacturer: 'Mahindra'
  },
  {
    id: '2',
    name: 'Seed Drill',
    description: 'Precision seed planting equipment',
    price: 45000,
    category: 'Planting',
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b1b?w=800',
    stock: 10,
    manufacturer: 'John Deere'
  },
  {
    id: '3',
    name: 'Sprinkler System',
    description: 'Automated irrigation system',
    price: 25000,
    category: 'Irrigation',
    image: 'https://images.unsplash.com/photo-1589928964725-6a548c613a38?w=800',
    stock: 15,
    manufacturer: 'Jain Irrigation'
  },
  {
    id: '4',
    name: 'Harvester',
    description: 'Efficient crop harvesting machine',
    price: 900000,
    category: 'Heavy Machinery',
    image: 'https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=800',
    stock: 3,
    manufacturer: 'New Holland'
  }
];

export function Equipment() {
  const { isDark } = useTheme();

  const handleAddToCart = (equipmentId: string) => {
    const equipment = sampleEquipment.find(e => e.id === equipmentId);
    if (equipment) {
      toast.success(`Added ${equipment.name} to cart`);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Farm Equipment
          </h1>

          <EquipmentComponent
            equipment={sampleEquipment}
            onAddToCart={handleAddToCart}
          />
        </motion.main>

        <footer className="bg-green-800 dark:bg-green-900 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Sahayogi Kishan</p>
          </div>
        </footer>
      </div>
    </div>
  );
}