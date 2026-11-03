import axios from 'axios';
import { useAuthStore } from '@/context/useAuthStore';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor de requisição: insere o header X-Admin-Token sempre que um token estiver presente no AuthStore
api.interceptors.request.use(
  (config) => {
    const adminToken = useAuthStore.getState().adminToken;
    if (adminToken) {
      config.headers['X-Admin-Token'] = adminToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
