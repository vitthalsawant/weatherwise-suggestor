
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import FadeIn from './transitions/FadeIn';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  isOpen, 
  onClose, 
  onSelectLocation 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentLocations] = useState(['San Francisco', 'New York', 'London', 'Tokyo', 'Sydney']);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when the modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectLocation(searchQuery);
      onClose();
    }
  };
  
  const handleSelectLocation = (location: string) => {
    onSelectLocation(location);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <FadeIn className="w-full max-w-md z-10">
        <div className="glass-card overflow-hidden shadow-elevated">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold">Search Location</h2>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="relative mb-6">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city or location..."
                className="w-full px-4 py-3 pl-10 rounded-lg border border-border bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              
              <button 
                type="submit"
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-primary text-primary-foreground transition-all",
                  !searchQuery.trim() && "opacity-50 pointer-events-none"
                )}
              >
                <Search size={16} />
              </button>
            </form>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Locations</h3>
              <ul className="space-y-2">
                {recentLocations.map((location, index) => (
                  <li key={location}>
                    <button
                      onClick={() => handleSelectLocation(location)}
                      className="w-full flex items-center p-2.5 rounded-md hover:bg-secondary/50 transition-colors text-left"
                    >
                      <MapPin size={16} className="mr-2 text-primary" />
                      <span>{location}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default LocationSearch;
