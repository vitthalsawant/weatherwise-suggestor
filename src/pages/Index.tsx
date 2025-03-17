
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import WeatherDisplay from '@/components/WeatherDisplay';
import Forecast from '@/components/Forecast';
import ActivitySuggestion from '@/components/ActivitySuggestion';
import LocationSearch from '@/components/LocationSearch';
import { fetchWeatherData, getActivitySuggestions } from '@/lib/weatherApi';
import { WeatherData } from '@/lib/types';
import { toast } from 'sonner';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('San Francisco');
  const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);
  
  const fetchData = async (loc: string) => {
    try {
      setIsLoading(true);
      const data = await fetchWeatherData(loc);
      setWeatherData(data);
      setLocation(data.location.name);
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
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 bg-animate">
      <Header 
        location={location} 
        onLocationClick={() => setIsLocationSearchOpen(true)}
      />
      
      <main className="flex-1 padded-container py-6 staggered-fade-in">
        <div className="max-w-3xl mx-auto">
          {weatherData && (
            <WeatherDisplay 
              weatherData={weatherData} 
              isLoading={isLoading} 
            />
          )}
          
          <Forecast 
            weatherData={weatherData} 
            isLoading={isLoading} 
          />
          
          {weatherData && (
            <ActivitySuggestion 
              suggestions={getActivitySuggestions(weatherData)} 
              isLoading={isLoading} 
            />
          )}
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
