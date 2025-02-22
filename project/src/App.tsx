import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Societies } from './pages/Societies';
import { Forum } from './pages/Forum';
import { Weather } from './pages/Weather';
import { Equipment } from './pages/Equipment';
import { Inventory } from './pages/Inventory';
import { useTheme } from './hooks/useTheme';
import { ChatBot } from './components/ChatBot';

function App() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </div>
  );
}

export default App