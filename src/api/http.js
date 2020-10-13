import axios from 'axios';
import apiKey from './apiKey';

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    accept: 'application/json',
  },
});

export { http, apiKey };
