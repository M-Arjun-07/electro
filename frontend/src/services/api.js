import axios from 'axios';
import { auth } from '../firebase';

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;
console.log(`[API Debug] Connecting to: ${baseURL}`);

const api = axios.create({
  baseURL,
});

// Add a request interceptor to include the Firebase ID token
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
