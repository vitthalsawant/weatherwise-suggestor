
import React, { useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from './transitions/FadeIn';

interface HeaderProps {
  location: string;
  onLocationClick: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  location, 
  onLocationClick, 
  activeSection,
  onSectionChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="padded-container flex items-center justify-between h-16">
        <div className="flex items-center">
          <FadeIn delay={100}>
            <h1 className="text-xl font-display font-semibold tracking-tight mr-2">
              WeatherWise
            </h1>
          </FadeIn>
        </div>
        
        <FadeIn delay={200}>
          <button 
            onClick={onLocationClick}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full bg-secondary/80 hover:bg-secondary"
          >
            <MapPin size={16} className="mr-1.5" />
            <span className="truncate max-w-[120px] sm:max-w-none">{location}</span>
          </button>
        </FadeIn>
        
        <div className="lg:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-1">
          <NavLinks 
            activeSection={activeSection} 
            onSectionChange={onSectionChange} 
          />
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300 lg:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <NavLinks 
            vertical 
            activeSection={activeSection}
            onSectionChange={(section) => {
              onSectionChange(section);
              setIsMenuOpen(false);
            }} 
          />
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  vertical?: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  vertical = false, 
  activeSection,
  onSectionChange 
}) => {
  const links = [
    { name: "Today", id: "today" },
    { name: "Forecast", id: "forecast" },
    { name: "Suggestions", id: "suggestions" },
    { name: "Settings", id: "settings" },
  ];
  
  return (
    <>
      {links.map((link, index) => (
        <FadeIn 
          key={link.id} 
          delay={200 + index * 50}
          className={cn(vertical ? "block" : "inline-block")}
        >
          <button
            onClick={() => onSectionChange(link.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              activeSection === link.id 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground",
              vertical ? "text-lg py-3" : ""
            )}
          >
            {link.name}
            {activeSection === link.id && (
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </FadeIn>
      ))}
    </>
  );
};

export default Header;
