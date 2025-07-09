import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Sample interceptor
api.interceptors.request.use(config => {
  // Add token or log
  return config;
});

export default api; 