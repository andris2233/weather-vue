import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    accept: 'application/json',
  },
});

// eslint-disable-next-line import/prefer-default-export
export { http };
