
import { WeatherData, ActivitySuggestion } from '../types';

// Get activity suggestions based on weather conditions
export const getActivitySuggestions = (weatherData: WeatherData): ActivitySuggestion[] => {
  const condition = weatherData.current.condition.text.toLowerCase();
  const temp = weatherData.current.temp_c;
  
  const suggestions: ActivitySuggestion[] = [];
  
  // Clear/Sunny suggestions
  if (condition.includes('sunny') || condition.includes('clear')) {
    if (temp > 25) {
      suggestions.push({ 
        activity: 'Beach Day', 
        description: 'Perfect weather for swimming or relaxing by the water.',
        icon: '🏖️' 
      });
      suggestions.push({ 
        activity: 'Park Visit', 
        description: 'Enjoy the sunshine at a local park or garden.',
        icon: '🌳' 
      });
    } else {
      suggestions.push({ 
        activity: 'Outdoor Café', 
        description: 'Enjoy a coffee or meal at an outdoor café.',
        icon: '☕' 
      });
      suggestions.push({ 
        activity: 'Cycling', 
        description: 'Great conditions for a bike ride.',
        icon: '🚲' 
      });
    }
  }
  
  // Cloudy suggestions
  if (condition.includes('cloud') || condition.includes('overcast')) {
    suggestions.push({ 
      activity: 'Museum Visit', 
      description: 'A perfect day to explore indoor cultural venues.',
      icon: '🏛️' 
    });
    suggestions.push({ 
      activity: 'Photography', 
      description: 'Cloudy days provide great natural lighting for photos.',
      icon: '📷' 
    });
  }
  
  // Rainy suggestions
  if (condition.includes('rain') || condition.includes('drizzle')) {
    suggestions.push({ 
      activity: 'Reading', 
      description: 'Stay in with a good book and listen to the rain.',
      icon: '📚' 
    });
    suggestions.push({ 
      activity: 'Movie Marathon', 
      description: 'Perfect weather to catch up on films or shows.',
      icon: '🎬' 
    });
  }
  
  // Cold weather suggestions
  if (temp < 10) {
    suggestions.push({ 
      activity: 'Hot Chocolate', 
      description: 'Warm up with a delicious hot beverage.',
      icon: '☕' 
    });
    suggestions.push({ 
      activity: 'Indoor Exercise', 
      description: 'Stay active with an indoor workout or yoga session.',
      icon: '🧘' 
    });
  }
  
  // Always add these fallback suggestions if we don't have enough
  if (suggestions.length < 2) {
    suggestions.push({ 
      activity: 'Local Exploration', 
      description: 'Discover hidden gems in your neighborhood.',
      icon: '🔍' 
    });
    suggestions.push({ 
      activity: 'Catch-Up Calls', 
      description: 'Connect with friends or family you haven\'t spoken to recently.',
      icon: '📱' 
    });
  }
  
  return suggestions.slice(0, 3); // Return top 3 suggestions
};
