import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { Package, TrendingUp, TrendingDown, RefreshCw, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { InventoryItem } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface InventoryItemWithSubsidy extends InventoryItem {
  subsidy?: {
    amount: number;
    percentage: number;
    description: string;
  };
}

export function Inventory() {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [inventory, setInventory] = useState<InventoryItemWithSubsidy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInventory();
    const subscription = supabase
      .channel('inventory_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'inventory_items' 
      }, payload => {
        console.log('Change received!', payload);
        fetchInventory();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchInventory = async () => {
    try {
      const { data: items, error: itemsError } = await supabase
        .from('inventory_items')
        .select(`
          *,
          subsidies (
            amount,
            percentage,
            description
          )
        `)
        .order('name');
      
      if (itemsError) throw itemsError;

      const inventoryWithSubsidies = items?.map(item => ({
        ...item,
        subsidy: item.subsidies?.[0]
      })) || [];

      setInventory(inventoryWithSubsidies);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to fetch inventory data');
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return 'outOfStock';
    if (quantity < 50) return 'lowStock';
    return 'inStock';
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || getStockStatus(item.quantity) === filter;
    return matchesSearch && matchesFilter;
  });

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'inStock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'lowStock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'outOfStock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const calculateSubsidizedPrice = (price: number, subsidy?: { amount: number; percentage: number }) => {
    if (!subsidy) return price;
    const percentageDiscount = (price * subsidy.percentage) / 100;
    const totalDiscount = Math.min(subsidy.amount, percentageDiscount);
    return Math.max(0, price - totalDiscount);
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
          >
            <div className="flex flex-col gap-4 mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="w-6 h-6 sm:w-8 sm:h-8" />
                Live Inventory
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Items</option>
                  <option value="inStock">In Stock</option>
                  <option value="lowStock">Low Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
                </div>
              ) : filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getStockStatusColor(getStockStatus(item.quantity))}`}>
                          {t(`inventory.${getStockStatus(item.quantity)}`)}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Quantity</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Price</span>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ₹{item.price}/{item.unit}
                            </span>
                            {item.subsidy && (
                              <div className="flex items-center mt-1 text-xs sm:text-sm">
                                <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-600" />
                                <span className="text-green-600">
                                  Subsidized: ₹{calculateSubsidizedPrice(item.price, item.subsidy)}/{item.unit}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Last Updated</span>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {new Date(item.lastUpdated).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {item.subsidy && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                          <h4 className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                            Government Subsidy Available
                          </h4>
                          <p className="text-xs sm:text-sm text-green-600 dark:text-green-300">
                            {item.subsidy.percentage}% off up to ₹{item.subsidy.amount}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Stock Trend</span>
                          {Math.random() > 0.5 ? (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="text-xs sm:text-sm">Increasing</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600 dark:text-red-400">
                              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="text-xs sm:text-sm">Decreasing</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                  No items found matching your criteria
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}