import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Society } from '../types';

interface SearchBarProps {
  societies: Society[];
  onSearch: (results: Society[]) => void;
}

export function SearchBar({ societies, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    const results = societies.filter(society => 
      society.name.toLowerCase().includes(searchQuery) ||
      society.inventory.some(item => 
        item.name.toLowerCase().includes(searchQuery)
      )
    );

    onSearch(results);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search societies or products..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-green-500 focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}