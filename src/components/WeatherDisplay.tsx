
import React from 'react';
import { WeatherData } from '@/lib/types';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import FadeIn from './transitions/FadeIn';
import { cn } from '@/lib/utils';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  isLoading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return <WeatherSkeleton />;
  }
  
  const { current, location } = weatherData;
  
  // Format the date and time
  const datetime = new Date(location.localtime);
  const formattedDate = datetime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedTime = datetime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return (
    <section className="mb-8">
      <FadeIn delay={300}>
        <div className="glass-card overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  {formattedDate} • {formattedTime}
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
                  {Math.round(current.temp_c)}°C
                </h2>
                <div className="flex items-center text-muted-foreground">
                  <WeatherIcon condition={current.condition.text} size={20} className="mr-2" />
                  <span>{current.condition.text}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Feels like {Math.round(current.feelslike_c)}°C
                </div>
              </div>
              
              <div className="flex items-center sm:items-end">
                <WeatherIcon 
                  condition={current.condition.text} 
                  size={90} 
                  className="animate-float" 
                />
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <WeatherDetail 
                icon={<Wind size={18} />}
                label="Wind"
                value={`${current.wind_kph} km/h`}
                detail={current.wind_dir}
              />
              
              <WeatherDetail 
                icon={<Droplets size={18} />}
                label="Humidity"
                value={`${current.humidity}%`}
              />
              
              <WeatherDetail 
                icon={<Thermometer size={18} />}
                label="UV Index"
                value={current.uv.toString()}
                detail={getUvLabel(current.uv)}
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ 
  icon, 
  label, 
  value, 
  detail 
}) => {
  return (
    <div className="flex flex-col items-center text-center p-2">
      <div className="mb-2 text-primary/80">
        {icon}
      </div>
      <div className="text-xs font-medium text-muted-foreground mb-1">
        {label}
      </div>
      <div className="text-base font-semibold">
        {value}
      </div>
      {detail && (
        <div className="text-xs text-muted-foreground mt-0.5">
          {detail}
        </div>
      )}
    </div>
  );
};

// Helper function to get UV label
const getUvLabel = (uv: number): string => {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very High';
  return 'Extreme';
};

// Loading skeleton
const WeatherSkeleton: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="glass-card overflow-hidden animate-pulse">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-3">
              <div className="h-4 w-40 bg-secondary rounded-md"></div>
              <div className="h-10 w-24 bg-secondary rounded-md"></div>
              <div className="h-5 w-32 bg-secondary rounded-md"></div>
              <div className="h-4 w-28 bg-secondary rounded-md"></div>
            </div>
            <div className="h-24 w-24 bg-secondary rounded-full"></div>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center p-2">
                <div className="h-6 w-6 bg-secondary rounded-full mb-2"></div>
                <div className="h-3 w-16 bg-secondary rounded-md mb-2"></div>
                <div className="h-5 w-12 bg-secondary rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherDisplay;
