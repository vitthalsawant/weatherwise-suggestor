
import React from 'react';
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Wind,
  Snowflake,
  CloudSun
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  condition: string;
  className?: string;
  size?: number;
  animated?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  className,
  size = 24,
  animated = true
}) => {
  const conditionLower = condition.toLowerCase();
  
  const getIcon = () => {
    // Match condition text to appropriate icon
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun size={size} className={cn("text-yellow-400", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('partly cloudy')) {
      return <CloudSun size={size} className={cn("text-gray-400", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      return <Cloud size={size} className={cn("text-gray-400", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return <CloudFog size={size} className={cn("text-gray-300", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('drizzle')) {
      return <CloudDrizzle size={size} className={cn("text-blue-300", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('rain')) {
      return <CloudRain size={size} className={cn("text-blue-400", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('snow')) {
      return <Snowflake size={size} className={cn("text-blue-100", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('thunder') || conditionLower.includes('lightning')) {
      return <CloudLightning size={size} className={cn("text-yellow-300", animated && "animate-pulse-subtle")} />;
    }
    
    if (conditionLower.includes('wind')) {
      return <Wind size={size} className={cn("text-gray-400", animated && "animate-pulse-subtle")} />;
    }
    
    // Default icon if no condition matches
    return <Sun size={size} className={cn("text-yellow-400", animated && "animate-pulse-subtle")} />;
  };
  
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
