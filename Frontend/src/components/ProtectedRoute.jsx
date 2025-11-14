import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Affiche un chargement pendant que le contexte vérifie l'user
    return <div style={{padding: '100px'}}>Chargement...</div>;
  }

  if (!isAuthenticated) {
    // Redirige vers /login si non authentifié
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Affiche le composant enfant (ex: <Profile />)
}

export default ProtectedRoute;