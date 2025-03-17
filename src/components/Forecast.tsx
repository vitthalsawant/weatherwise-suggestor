
import React, { useState } from 'react';
import { WeatherData, ForecastDay } from '@/lib/types';
import WeatherIcon from './WeatherIcon';
import FadeIn from './transitions/FadeIn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ForecastProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

const Forecast: React.FC<ForecastProps> = ({ weatherData, isLoading }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  if (isLoading || !weatherData) {
    return <ForecastSkeleton />;
  }
  
  const { forecast } = weatherData;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
    };
  };
  
  const handlePrevDay = () => {
    setSelectedDay((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  const handleNextDay = () => {
    setSelectedDay((prev) => (prev < forecast.forecastday.length - 1 ? prev + 1 : prev));
  };
  
  return (
    <section className="mb-8">
      <FadeIn delay={400}>
        <div className="glass-card overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold">7-Day Forecast</h3>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={handlePrevDay}
                className={cn(
                  "p-1.5 rounded-full hover:bg-secondary transition-colors",
                  selectedDay === 0 && "opacity-30 cursor-not-allowed"
                )}
                disabled={selectedDay === 0}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex-1 overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${selectedDay * (100 / 7)}%)` }}
                >
                  {forecast.forecastday.map((day, idx) => {
                    const { day: dayName, date } = formatDate(day.date);
                    return (
                      <div 
                        key={day.date}
                        className={cn(
                          "flex-shrink-0 w-1/7 min-w-[calc(100%/7)] p-2 text-center cursor-pointer transition-all",
                          idx === selectedDay ? "scale-110 text-foreground" : "text-muted-foreground"
                        )}
                        onClick={() => setSelectedDay(idx)}
                      >
                        <div className="text-xs font-medium mb-1">{dayName}</div>
                        <div className="text-sm font-semibold mb-2">{date}</div>
                        <div className="flex justify-center mb-1">
                          <WeatherIcon condition={day.day.condition.text} size={24} animated={idx === selectedDay} />
                        </div>
                        <div className="text-sm font-medium">
                          {Math.round(day.day.maxtemp_c)}° <span className="text-muted-foreground">{Math.round(day.day.mintemp_c)}°</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <button 
                onClick={handleNextDay}
                className={cn(
                  "p-1.5 rounded-full hover:bg-secondary transition-colors",
                  selectedDay === forecast.forecastday.length - 1 && "opacity-30 cursor-not-allowed"
                )}
                disabled={selectedDay === forecast.forecastday.length - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="mt-6">
              <HourlyForecast day={forecast.forecastday[selectedDay]} />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

interface HourlyForecastProps {
  day: ForecastDay;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ day }) => {
  const currentHour = new Date().getHours();
  const visibleHours = day.hour.slice(currentHour, currentHour + 6);
  
  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-4">Hourly Forecast</h4>
      <div className="grid grid-cols-6 gap-2">
        {visibleHours.map((hour, idx) => {
          const time = new Date(hour.time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          });
          
          return (
            <div key={hour.time} className="flex flex-col items-center text-center">
              <div className="text-xs mb-1.5">{time}</div>
              <WeatherIcon condition={hour.condition.text} size={20} className="mb-1.5" />
              <div className="text-sm font-medium">{Math.round(hour.temp_c)}°</div>
              <div className="text-xs text-blue-400 mt-1">
                {hour.chance_of_rain > 0 ? `${hour.chance_of_rain}%` : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Loading skeleton
const ForecastSkeleton: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="glass-card overflow-hidden animate-pulse">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-40 bg-secondary rounded-md"></div>
          </div>
          
          <div className="flex justify-between mb-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-4 w-8 bg-secondary rounded-md mb-2"></div>
                <div className="h-4 w-6 bg-secondary rounded-md mb-2"></div>
                <div className="h-8 w-8 bg-secondary rounded-full mb-2"></div>
                <div className="h-4 w-10 bg-secondary rounded-md"></div>
              </div>
            ))}
          </div>
          
          <div className="h-5 w-32 bg-secondary rounded-md mb-4"></div>
          
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-4 w-10 bg-secondary rounded-md mb-2"></div>
                <div className="h-6 w-6 bg-secondary rounded-full mb-2"></div>
                <div className="h-4 w-8 bg-secondary rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forecast;
