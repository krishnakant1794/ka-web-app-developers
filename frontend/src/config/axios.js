import axios from 'axios';

// Set default baseURL for all axios requests
const baseURL = import.meta.env.VITE_API_URL || '';
// Only set baseURL if VITE_API_URL is provided (production)
// In development, use relative URLs with proxy
if (baseURL) {
  axios.defaults.baseURL = baseURL;
}

const api = axios.create({
  baseURL: baseURL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

