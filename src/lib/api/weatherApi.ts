import { WeatherData } from '../types';
import { OPENWEATHER_API_KEY } from './config';

// Function to fetch actual weather data from OpenWeatherMap API
export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // First get coordinates for the location
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const geoResponse = await fetch(geoUrl);
    
    if (!geoResponse.ok) {
      throw new Error(`Geo API request failed with status ${geoResponse.status}`);
    }
    
    const geoData = await geoResponse.json();
    
    if (!geoData.length) {
      throw new Error(`Location "${location}" not found`);
    }
    
    const { lat, lon, name, country } = geoData[0];
    
    // Now get current weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
      throw new Error(`Weather API request failed with status ${weatherResponse.status}`);
    }
    
    const weatherData = await weatherResponse.json();
    
    // Get forecast data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API request failed with status ${forecastResponse.status}`);
    }
    
    const forecastData = await forecastResponse.json();
    
    // Format the data to match our WeatherData type
    return formatWeatherData(location, weatherData, forecastData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Helper function to format API response to match our WeatherData type
function formatWeatherData(locationName: string, currentData: any, forecastData: any): WeatherData {
  // Process and organize forecast by days
  const forecastDays = new Map<string, any>();
  
  forecastData.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!forecastDays.has(date)) {
      forecastDays.set(date, {
        temps: [],
        conditions: [],
        hourly: []
      });
    }
    
    const dayData = forecastDays.get(date);
    dayData.temps.push(item.main.temp);
    dayData.conditions.push(item.weather[0]);
    
    dayData.hourly.push({
      time: item.dt_txt,
      temp_c: item.main.temp,
      temp_f: (item.main.temp * 9/5) + 32,
      condition: {
        text: item.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        code: item.weather[0].id
      },
      chance_of_rain: item.pop * 100
    });
  });
  
  // Format forecast days
  const forecastdays = Array.from(forecastDays.entries()).map(([date, data]) => {
    // Calculate min, max and avg temperature
    const minTemp = Math.min(...data.temps);
    const maxTemp = Math.max(...data.temps);
    const avgTemp = data.temps.reduce((sum: number, temp: number) => sum + temp, 0) / data.temps.length;
    
    // Get most frequent condition
    const conditionCounts = data.conditions.reduce((counts: any, condition: any) => {
      counts[condition.id] = (counts[condition.id] || 0) + 1;
      return counts;
    }, {});
    
    const mostFrequentConditionId = Object.entries(conditionCounts)
      .sort((a: any, b: any) => b[1] - a[1])[0][0];
    
    const mainCondition = data.conditions.find((c: any) => c.id.toString() === mostFrequentConditionId);
    
    return {
      date,
      day: {
        maxtemp_c: maxTemp,
        maxtemp_f: (maxTemp * 9/5) + 32,
        mintemp_c: minTemp,
        mintemp_f: (minTemp * 9/5) + 32,
        avgtemp_c: avgTemp,
        avgtemp_f: (avgTemp * 9/5) + 32,
        condition: {
          text: mainCondition.main,
          icon: `https://openweathermap.org/img/wn/${mainCondition.icon}@2x.png`,
          code: mainCondition.id
        },
        daily_chance_of_rain: Math.max(...data.hourly.map((h: any) => h.chance_of_rain))
      },
      hour: data.hourly
    };
  });
  
  // Format the current weather data
  return {
    location: {
      name: locationName,
      country: currentData.sys.country,
      lat: currentData.coord.lat,
      lon: currentData.coord.lon,
      localtime: new Date().toLocaleString(),
    },
    current: {
      temp_c: currentData.main.temp,
      temp_f: (currentData.main.temp * 9/5) + 32,
      condition: {
        text: currentData.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
        code: currentData.weather[0].id,
      },
      wind_kph: currentData.wind.speed * 3.6, // Convert m/s to km/h
      wind_dir: getWindDirection(currentData.wind.deg),
      precip_mm: currentData.rain ? currentData.rain['1h'] : 0,
      humidity: currentData.main.humidity,
      feelslike_c: currentData.main.feels_like,
      feelslike_f: (currentData.main.feels_like * 9/5) + 32,
      uv: currentData.uvi || 0,
    },
    forecast: {
      forecastday: forecastdays,
    },
  };
}

// Helper function to convert wind degrees to direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// Keep the helper functions for backward compatibility in case they're used elsewhere
function generateHourlyForecast() {
  const hours = [];
  const currentHour = new Date().getHours();
  
  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24;
    const time = `${new Date().toISOString().split('T')[0]} ${hour}:00`;
    
    hours.push({
      time,
      temp_c: 15 + Math.sin(i / 3) * 5, // Temperatures vary in a sine wave pattern
      temp_f: (15 + Math.sin(i / 3) * 5) * 1.8 + 32,
      condition: {
        text: i % 8 === 0 ? "Cloudy" : "Partly cloudy",
        icon: i % 8 === 0 ? "//cdn.weatherapi.com/weather/64x64/day/119.png" : "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: i % 8 === 0 ? 1006 : 1003,
      },
      chance_of_rain: i % 8 === 0 ? 30 : 10,
    });
  }
  
  return hours;
}

function generateNextDaysForecast(days: number) {
  const forecast = [];
  const conditions = [
    { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png", code: 1000 },
    { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png", code: 1003 },
    { text: "Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/119.png", code: 1006 },
    { text: "Light rain", icon: "//cdn.weatherapi.com/weather/64x64/day/296.png", code: 1183 },
  ];
  
  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const baseTemp = 15 + Math.sin(i / 2) * 5;
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      day: {
        maxtemp_c: baseTemp + 5,
        maxtemp_f: (baseTemp + 5) * 1.8 + 32,
        mintemp_c: baseTemp - 5,
        mintemp_f: (baseTemp - 5) * 1.8 + 32,
        avgtemp_c: baseTemp,
        avgtemp_f: baseTemp * 1.8 + 32,
        condition,
        daily_chance_of_rain: condition.text.includes("rain") ? 70 : 10,
      },
      hour: generateHourlyForecast(),
    });
  }
  
  return forecast;
}
