import { http } from './http';

export default {
  apiKey: process.env.VUE_APP_API_KEY,
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
