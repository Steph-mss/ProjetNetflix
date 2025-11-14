// src/components/AdminRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, useLocation } from 'react-router-dom';

function AdminRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  // 1. D'abord, est-il connecté ?
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Ensuite, est-il admin ?
  if (user.role !== 'admin') {
    // Si ce n'est pas un admin, on le renvoie à l'accueil
    return <Navigate to="/" replace />;
  }

  // Si tout est bon, on affiche la page
  return children; 
}

export default AdminRoute;