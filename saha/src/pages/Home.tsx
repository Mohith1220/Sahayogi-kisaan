import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sprout, Users, Sun, Wind, ShoppingBag, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';

export function Home() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <motion.section
        className="pt-20 pb-32 px-4 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-30" />
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              backgroundSize: ['100% 100%', '200% 200%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
        </motion.div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-green-800 dark:text-green-400 mb-6"
            variants={itemVariants}
          >
            Sahayogi Kishan
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link
              to="/societies"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
            >
              {t('home.exploreSocieties')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Access Section */}
      <motion.section
        className="py-12 bg-white dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/weather">
              <motion.div
                className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/50 hover:shadow-lg transition-all cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Sun className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold dark:text-white">Weather Updates</h3>
              </motion.div>
            </Link>

            <Link to="/equipment">
              <motion.div
                className="p-6 rounded-xl bg-green-50 dark:bg-green-900/50 hover:shadow-lg transition-all cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <ShoppingBag className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-lg font-semibold dark:text-white">Farm Equipment</h3>
              </motion.div>
            </Link>

            <Link to="/forum">
              <motion.div
                className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/50 hover:shadow-lg transition-all cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold dark:text-white">Community Forum</h3>
              </motion.div>
            </Link>

            <Link to="/societies">
              <motion.div
                className="p-6 rounded-xl bg-orange-50 dark:bg-orange-900/50 hover:shadow-lg transition-all cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold dark:text-white">Rural Societies</h3>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 bg-gray-50 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <Sprout className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('home.features.sustainable')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.features.sustainableDesc')}</p>
            </motion.div>

            <motion.div
              className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <Users className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('home.features.community')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.features.communityDesc')}</p>
            </motion.div>

            <motion.div
              className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <Wind className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('home.features.weather')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.features.weatherDesc')}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-16 bg-green-50 dark:bg-green-900/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300">{t('home.stats.societies')}</div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-300">{t('home.stats.farmers')}</div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">30+</div>
              <div className="text-gray-600 dark:text-gray-300">{t('home.stats.products')}</div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-300">{t('home.stats.districts')}</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="bg-green-800 dark:bg-green-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Sahayogi Kishan</p>
        </div>
      </footer>
    </div>
  );
}