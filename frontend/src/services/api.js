import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api' 
  : 'https://your-production-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // Redirect to login screen
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getRideHistory: () => api.get('/users/ride-history'),
};

// Ride API
export const rideAPI = {
  requestRide: (rideData) => api.post('/rides/request', rideData),
  getActiveRide: () => api.get('/rides/active'),
  cancelRide: (rideId) => api.put(`/rides/${rideId}/cancel`),
  completeRide: (rideId) => api.put(`/rides/${rideId}/complete`),
  trackRide: (rideId) => api.get(`/rides/${rideId}/track`),
};

// Driver API
export const driverAPI = {
  getNearbyDrivers: (location) => api.get('/drivers/nearby', { params: location }),
  updateLocation: (locationData) => api.put('/drivers/location', locationData),
  updateStatus: (status) => api.put('/drivers/status', { status }),
  getEarnings: () => api.get('/drivers/earnings'),
};

export default api;
