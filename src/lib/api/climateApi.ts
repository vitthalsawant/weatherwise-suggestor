
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from './config';

// Climate forecast API endpoint
export const fetchClimateForecast = async (lat: number, lon: number): Promise<any> => {
  try {
    // For demonstration, we'll log the URL that would be called
    const url = `${OPENWEATHER_BASE_URL}/forecast/climate?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    console.log(`Calling climate forecast API: ${url}`);
    
    // In a real implementation, you'd fetch from the API:
    // const response = await fetch(url);
    // const data = await response.json();
    // return data;
    
    // For now, we'll return mock data
    return {
      city: {
        name: "Sample City",
        country: "Country",
        coord: { lat, lon }
      },
      list: [
        // Sample climate forecast data
        { temp: { day: 22.5 }, humidity: 65, dt: Date.now() / 1000 },
        { temp: { day: 23.1 }, humidity: 62, dt: (Date.now() / 1000) + 86400 }
      ]
    };
  } catch (error) {
    console.error("Error fetching climate forecast:", error);
    throw error;
  }
};
