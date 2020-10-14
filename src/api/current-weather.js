import { http, apiKey } from './http';

export default {
  apiKey,
  notApiKey() {
    throw new Error('apiKey');
  },
  getCurrWeatherByCountry(query) {
    if (!this.apiKey) {
      this.notApiKey();
    }
    return http.get(`weather?q=${query}&appid=${this.apiKey}&units=metric&lang=ru`);
  },
  getForecastWeatherByCountry(query) {
    if (!this.apiKey) {
      this.notApiKey();
    }
    return http.get(`forecast?q=${query}&appid=${this.apiKey}&units=metric&lang=ru`);
  },
};
