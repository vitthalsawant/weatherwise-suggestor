
// This file re-exports all weather API related functionalities 
// to maintain backward compatibility
import { fetchWeatherData } from './api/weatherApi';
import { fetchClimateForecast } from './api/climateApi';
import { getActivitySuggestions } from './services/activitySuggestionService';

export {
  fetchWeatherData,
  fetchClimateForecast,
  getActivitySuggestions
};
