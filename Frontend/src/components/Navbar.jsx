// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          MOOVFLIX
        </Link>
        <div className="navbar-links">
          
          {/* Le lien "Accueil" pointe bien vers "/" */}
          <Link to="/">Accueil</Link>

          {/* CORRECTION : Ces liens pointent maintenant vers les bonnes pages */}
          <Link to="/series">Séries</Link>
          <Link to="/films">Films</Link>
          
          {/* Lien Admin (visible uniquement si admin) */}
          {isAuthenticated && user.role === 'admin' && (
            <Link to="/admin" style={{ color: '#e50914', fontWeight: 'bold' }}>
              Admin
            </Link>
          )}

        </div>
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <div className="navbar-profile">
            <span>Bienvenue, {user.nom}</span>
            <Link to="/profile" className="profile-link">Profil</Link>
            <button onClick={handleLogout} className="logout-button">
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="navbar-auth-buttons">
            <Link to="/register" className="register-button-nav">S'inscrire</Link>
            <Link to="/login" className="login-button-nav">Connexion</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;