import { http, apiKey } from './http';

export default {
  getCurrWeatherByCountry: (query) => http.get(`weather?q=${query}&appid=${apiKey}&units=metric&lang=ru`),
};
