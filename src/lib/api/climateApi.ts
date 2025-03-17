
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from './config';

// Climate forecast API endpoint
export const fetchClimateForecast = async (lat: number, lon: number): Promise<any> => {
  try {
    const url = `${OPENWEATHER_BASE_URL}/forecast/climate?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    
    // Now making an actual API call instead of returning mock data
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching climate forecast:", error);
    throw error;
  }
};
