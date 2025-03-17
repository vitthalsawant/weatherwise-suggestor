
import React, { useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from './transitions/FadeIn';

interface HeaderProps {
  location: string;
  onLocationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ location, onLocationClick }) => {
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
          <NavLinks />
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
          <NavLinks vertical onClick={() => setIsMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  vertical?: boolean;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ vertical = false, onClick }) => {
  const links = [
    { name: "Today", href: "#" },
    { name: "Forecast", href: "#" },
    { name: "Suggestions", href: "#" },
    { name: "Settings", href: "#" },
  ];
  
  return (
    <>
      {links.map((link, index) => (
        <FadeIn 
          key={link.name} 
          delay={200 + index * 50}
          className={cn(vertical ? "block" : "inline-block")}
        >
          <a
            href={link.href}
            onClick={onClick}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              "text-muted-foreground hover:text-foreground",
              vertical ? "text-lg py-3" : ""
            )}
          >
            {link.name}
          </a>
        </FadeIn>
      ))}
    </>
  );
};

export default Header;
