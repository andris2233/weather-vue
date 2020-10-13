import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    accept: 'application/json',
  },
});

const apiKey = '0a11bbc5faa014ec1997dbed57876d0a';

export { http, apiKey };
