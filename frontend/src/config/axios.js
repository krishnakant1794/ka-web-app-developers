import axios from 'axios';

// Set default baseURL for all axios requests and trim any trailing slash
let baseURL = import.meta.env.VITE_API_URL ? String(import.meta.env.VITE_API_URL).replace(/\/$/, '') : '';

// Warn in production if VITE_API_URL is not set (helps diagnose 405 -> same-origin requests)
if (import.meta.env.PROD && !baseURL) {
  // eslint-disable-next-line no-console
  console.warn('VITE_API_URL is not set. Axios will send requests to the frontend origin (same-origin). Add VITE_API_URL in Vercel and redeploy.');
}

// Expose the resolved baseURL for debugging if needed
// eslint-disable-next-line no-console
console.info('API baseURL:', baseURL || '(none - using frontend origin)');

// Only set axios default if baseURL provided
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

