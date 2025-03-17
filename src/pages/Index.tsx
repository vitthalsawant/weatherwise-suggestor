
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import WeatherDisplay from '@/components/WeatherDisplay';
import Forecast from '@/components/Forecast';
import ActivitySuggestion from '@/components/ActivitySuggestion';
import LocationSearch from '@/components/LocationSearch';
import Settings from '@/components/Settings';
import Map from '@/components/Map';
import { fetchWeatherData, getActivitySuggestions } from '@/lib/weatherApi';
import { WeatherData } from '@/lib/types';
import { toast } from 'sonner';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('San Francisco');
  const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('today');
  const [showMap, setShowMap] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  const fetchData = async (loc: string) => {
    try {
      setIsLoading(true);
      const data = await fetchWeatherData(loc);
      setWeatherData(data);
      setLocation(data.location.name);
      
      // Show map after successful location change
      setShowMap(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error('Failed to load weather data. Please try again.', {
        description: 'There was an issue connecting to the weather service.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(location);
  }, []);
  
  const handleLocationChange = (newLocation: string) => {
    toast.info(`Updating weather for ${newLocation}`);
    fetchData(newLocation);
  };
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Scroll to the corresponding section
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const renderActiveSection = () => {
    if (!weatherData) return null;
    
    switch (activeSection) {
      case 'today':
        return (
          <>
            <WeatherDisplay 
              weatherData={weatherData} 
              isLoading={isLoading} 
            />
            
            {showMap && (
              <section className="mb-8">
                <div className="glass-card overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold mb-4">Weather Map</h3>
                    <Map 
                      lat={weatherData.location.lat} 
                      lon={weatherData.location.lon}
                      locationName={weatherData.location.name}
                    />
                  </div>
                </div>
              </section>
            )}
          </>
        );
      case 'forecast':
        return (
          <Forecast 
            weatherData={weatherData} 
            isLoading={isLoading} 
          />
        );
      case 'suggestions':
        return (
          <ActivitySuggestion 
            suggestions={getActivitySuggestions(weatherData)} 
            isLoading={isLoading} 
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return (
          <WeatherDisplay 
            weatherData={weatherData} 
            isLoading={isLoading} 
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 bg-animate">
      <Header 
        location={location} 
        onLocationClick={() => setIsLocationSearchOpen(true)}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="flex-1 padded-container py-6 staggered-fade-in" ref={contentRef}>
        <div className="max-w-3xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
      
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border/40 py-4">
        <div className="padded-container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WeatherWise. All rights reserved.</p>
        </div>
      </footer>
      
      <LocationSearch
        isOpen={isLocationSearchOpen}
        onClose={() => setIsLocationSearchOpen(false)}
        onSelectLocation={handleLocationChange}
      />
    </div>
  );
};

export default Index;
