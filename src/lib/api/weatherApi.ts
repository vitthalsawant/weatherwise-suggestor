
import { WeatherData } from '../types';

// For simplicity in this demo we're using mock data
// In a real implementation, you'd fetch from a weather API
export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock weather data
  return {
    location: {
      name: location || "San Francisco",
      country: "United States",
      lat: 37.7749,
      lon: -122.4194,
      localtime: new Date().toLocaleString(),
    },
    current: {
      temp_c: 18,
      temp_f: 64.4,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003,
      },
      wind_kph: 15.1,
      wind_dir: "WSW",
      precip_mm: 0,
      humidity: 72,
      feelslike_c: 17.5,
      feelslike_f: 63.5,
      uv: 4,
    },
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString().split('T')[0],
          day: {
            maxtemp_c: 21,
            maxtemp_f: 69.8,
            mintemp_c: 15,
            mintemp_f: 59,
            avgtemp_c: 18,
            avgtemp_f: 64.4,
            condition: {
              text: "Partly cloudy",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1003,
            },
            daily_chance_of_rain: 20,
          },
          hour: generateHourlyForecast(),
        },
        ...generateNextDaysForecast(6),
      ],
    },
  };
};

// Helper function to generate mock hourly forecast
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

// Helper function to generate mock forecast for next days
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
