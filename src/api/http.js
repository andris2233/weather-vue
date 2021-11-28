import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/data/2.5/`,

  headers: { accept: 'application/json' },
});
