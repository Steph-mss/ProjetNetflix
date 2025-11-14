// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, fetchUserProfile } from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      // On regarde si un token est déjà stocké
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // On valide le token en allant chercher le profil
          const response = await fetchUserProfile();
          setUser(response.data);
        } catch (error) {
          console.error("Token invalide ou expiré:", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // --- 
  // --- Fonction LOGIN Corrigée ---
  // --- 
  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Appelle l'API de login
      const loginResponse = await loginUser({ email, password });

      // 2. CORRECTION : On récupère "accessToken", pas "token"
      const { accessToken } = loginResponse.data;
      
      if (!accessToken) {
        throw new Error("Le backend n'a pas renvoyé de accessToken");
      }

      // 3. CORRECTION : On stocke le "accessToken" sous le nom "token"
      // C'est ce que notre 'api.js' (intercepteur) ira lire
      localStorage.setItem('token', accessToken);
      
      // 4. On va chercher le profil de l'utilisateur
      const userResponse = await fetchUserProfile();

      // 5. On met à jour l'utilisateur
      setUser(userResponse.data); 
      
      setLoading(false);
      return true; // Connexion réussie

    } catch (error) {
      console.error("Erreur de connexion:", error);
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      return false; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    console.log("Utilisateur déconnecté");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div style={{ background: '#141414', color: 'white', minHeight: '100vh', padding: '20px' }}>Chargement de l'application...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}