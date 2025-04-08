import React from 'react';
import { Mountain, Search, Star } from 'lucide-react';

interface HeaderProps {
  total: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showPopularOnly: boolean;
  onPopularToggle: (show: boolean) => void;
}

export function Header({ 
  total, 
  searchQuery, 
  onSearchChange,
  showPopularOnly,
  onPopularToggle
}: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-3 sm:p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-2xl font-bold">Himalaya Imbiss</h1>
          </div>
          <div className="text-lg sm:text-xl font-bold">
            ${total.toFixed(2)}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <button
            onClick={() => onPopularToggle(!showPopularOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showPopularOnly 
                ? 'bg-yellow-500 text-blue-900' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Star className={`w-5 h-5 ${showPopularOnly ? 'fill-blue-900' : ''}`} />
            Popular Items
          </button>
        </div>
      </div>
    </header>
  );
}