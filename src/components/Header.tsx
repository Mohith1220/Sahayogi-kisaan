import React, { useState } from 'react';
import { Store, Sun, Moon, MessageSquare, ShoppingBag, Menu, X, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-green-700 dark:bg-green-900 text-white p-4 shadow-lg relative z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <h1 className="text-lg sm:text-2xl font-bold">Sahayogi Kishan</h1>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'kn')}
              className="bg-green-600 dark:bg-green-800 text-white px-2 py-1 text-sm sm:text-base sm:px-3 rounded-md"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="kn">KN</option>
            </select>
            
            <button 
              onClick={toggleTheme}
              className="p-1 sm:p-2 hover:bg-green-600 dark:hover:bg-green-800 rounded-full transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </button>
            
            <button 
              onClick={toggleMenu}
              className="p-1 sm:p-2 hover:bg-green-600 dark:hover:bg-green-800 rounded-full"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className={`
          fixed left-0 right-0 top-[64px] sm:top-[72px]
          bg-green-700 dark:bg-green-900
          shadow-lg
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
          z-50
        `}>
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link
              to="/societies"
              className="py-3 px-4 hover:bg-green-600 dark:hover:bg-green-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.societies')}
            </Link>
            <Link
              to="/inventory"
              className="py-3 px-4 hover:bg-green-600 dark:hover:bg-green-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                {t('nav.inventory')}
              </span>
            </Link>
            <Link
              to="/forum"
              className="py-3 px-4 hover:bg-green-600 dark:hover:bg-green-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.forum')}
            </Link>
            <Link
              to="/weather"
              className="py-3 px-4 hover:bg-green-600 dark:hover:bg-green-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.weather')}
            </Link>
            <Link
              to="/equipment"
              className="py-3 px-4 hover:bg-green-600 dark:hover:bg-green-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.equipment')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}