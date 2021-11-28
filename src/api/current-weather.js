import http from './http';

export default {
  apiKey: process.env.VUE_APP_API_KEY,

  checkApiKey() { if (!this.apiKey) throw new Error('apiKey'); },

  getCurrWeatherByCountry(query) {
    this.checkApiKey();

    return http.get(`weather?q=${query}&appid=${this.apiKey}&units=metric&lang=ru`);
  },

  getForecastWeatherByCountry(query) {
    this.checkApiKey();

    return http.get(`forecast?q=${query}&appid=${this.apiKey}&units=metric&lang=ru`);
  },
};
