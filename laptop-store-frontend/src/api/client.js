import axios from 'axios';

// Points at the Laravel API built previously (routes/api.php).
// Override in .env as VITE_API_URL if your backend runs elsewhere.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const client = axios.create({ baseURL });

// Attach the Sanctum bearer token (saved on login/register) to every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, clear it so the app falls back to
// logged-out state instead of silently failing on every request.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default client;
