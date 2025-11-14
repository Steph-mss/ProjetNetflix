// src/services/api.js
import axios from 'axios';

// 1. DÉFINITION DE APICLIENT
const apiClient = axios.create({
  // --- CORRECTION ICI ---
  // On enlève /api, car les routes sont probablement à la racine
  baseURL: 'http://localhost:4000/', 
  timeout: 1000,
});

// 2. INTERCEPTEUR (Pour envoyer le token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. TOUTES LES FONCTIONS D'API
// (Elles appelleront maintenant les bonnes adresses, ex: http://localhost:4000/auth/login)

// --- Authentification ---
export const registerUser = (userData) => apiClient.post('/auth/register', userData);
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const fetchUserProfile = () => apiClient.get('/auth/me');

// --- Films ---
export const fetchMovies = () => apiClient.get('/films');
export const fetchMovieById = (id) => apiClient.get(`/films/${id}`);
export const createMovie = (movieData) => apiClient.post('/films', movieData);
export const deleteMovie = (id) => apiClient.delete(`/films/${id}`);
// --- Séries ---
export const fetchSeries = () => apiClient.get('/series');
export const fetchSerieById = (id) => apiClient.get(`/series/${id}`);
export const createSerie = (serieData) => apiClient.post('/series', serieData);
export const deleteSerie = (id) => apiClient.delete(`/series/${id}`);

// --- Favoris ---
export const fetchFavorites = (userId) => {
  return apiClient.get(`/favoris/user/${userId}`);
};

export const addFavorite = (mediaId, mediaType) => {
  return apiClient.post('/favoris', { mediaId, mediaType });
};

export const removeFavorite = (favoriId) => {
  return apiClient.delete(`/favoris/${favoriId}`);
};

// 4. EXPORT PAR DÉFAUT
export default apiClient;