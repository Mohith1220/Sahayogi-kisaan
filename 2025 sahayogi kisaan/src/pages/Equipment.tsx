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
    image: 'https://th.bing.com/th/id/OIP.b_TQYSCZfA1o8j_lhSfbfgHaE7?rs=1&pid=ImgDetMain',
    stock: 5,
    manufacturer: 'Mahindra'
  },
  {
    id: '2',
    name: 'Seed Drill',
    description: 'Precision seed planting equipment',
    price: 45000,
    category: 'Planting',
    image: 'https://th.bing.com/th/id/OIP.U9xuSpxjhebhpJnmpsXVywHaE4?rs=1&pid=ImgDetMain',
    stock: 10,
    manufacturer: 'John Deere'
  },
  {
    id: '3',
    name: 'Sprinkler System',
    description: 'Automated irrigation system',
    price: 25000,
    category: 'Irrigation',
    image: 'https://th.bing.com/th/id/R.be9158d7005254731f241490064549eb?rik=KTZlT7MUgFpuwQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fd%2fd4%2fImpact_Sprinkler_Mechanism_2.jpg&ehk=YhlyEpZDZWyNmoNVZ%2bqH5MasWzIGn1bu0ejWdBoIvq8%3d&risl=&pid=ImgRaw&r=0',
    stock: 15,
    manufacturer: 'Jain Irrigation'
  },
  {
    id: '4',
    name: 'Harvester',
    description: 'Efficient crop harvesting machine',
    price: 900000,
    category: 'Heavy Machinery',
    image: 'https://www.indofarm.in/wp-content/uploads/2022/05/harvester.jpeg',
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
            <p>© 2025 Sahayogi Kishan</p>
          </div>
        </footer>
      </div>
    </div>
  );
}