// services/api.js
import axios from 'axios';
import router from '../router';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.data); // Pour le debugging

    if (error.response?.status === 401) {
      const errorCode = error.response.data.code;

      switch (errorCode) {
        case 'TOKEN_EXPIRED':
          console.log('Session expirée');
          // Émettre l'événement de session expirée
          window.dispatchEvent(new CustomEvent('session-expired', {
            detail: { message: 'Votre session a expiré. Veuillez vous reconnecter.' }
          }));
          break;

        case 'TOKEN_INVALID':
        case 'TOKEN_VERIFICATION_FAILED':
          console.log('Token invalide');
          window.dispatchEvent(new CustomEvent('session-expired', {
            detail: { message: 'Votre session est invalide. Veuillez vous reconnecter.' }
          }));
          break;

        case 'NO_TOKEN':
        case 'TOKEN_NOT_FOUND':
          console.log('Pas de token');
          // Rediriger directement vers la page de login sans modal
          router.push('/login');
          break;
      }

      // Dans tous les cas d'erreur 401, nettoyer le stockage
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default api;