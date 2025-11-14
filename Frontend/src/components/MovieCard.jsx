// src/components/MovieCard.jsx
import React from 'react';
import { addFavorite } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

// NOUVEAU : on accepte 'onRemove' comme prop
function MovieCard({ movie, mediaType, onRemove }) {
  const { isAuthenticated } = useAuth();

  // Bouton "Ajouter" (pour Home, Films, Series)
  const handleAddToFavorites = async () => {
    if (!mediaType || !movie.id) {
      alert("Erreur : Type ou ID manquant.");
      return;
    }
    try {
      await addFavorite(movie.id, mediaType);
      alert(`${movie.titre} ajouté aux favoris !`);
    } catch (error) {
      console.error("Erreur ajout favori:", error);
      alert("Erreur lors de l'ajout.");
    }
  };

  // Bouton "Supprimer" (pour Profile)
  const handleRemoveClick = () => {
    // onRemove est la fonction passée depuis Profile.jsx
    if (onRemove) {
      onRemove(); // La fonction gère déjà la confirmation et l'appel API
    }
  };

  // Sécurité (au cas où les données sont incomplètes)
  if (!movie || !movie.images || movie.images.length === 0) {
    return <div className="movie-card">Donnée corrompue</div>;
  }

  return (
    <div className="movie-card">
      <img src={movie.images[0]} alt={movie.titre} />
      <div className="movie-card-info">
        <h4>{movie.titre}</h4>
        
        {/* LOGIQUE CONDITIONNELLE POUR LE BOUTON */}
        {onRemove ? (
          // Si on est sur la page Profile ('onRemove' est fourni)
          <button onClick={handleRemoveClick} style={removeButtonStyle}>
            X
          </button>
        ) : (
          // Si on est sur Home/Films/Series ('onRemove' n'est pas fourni)
          isAuthenticated && (
            <button onClick={handleAddToFavorites} style={addButtonStyle}>
              +
            </button>
          )
        )}
      </div>
    </div>
  );
}

// Styles pour les boutons (tu peux les mettre dans ton CSS)
const addButtonStyle = {
  cursor: 'pointer', background: 'rgba(255,255,255,0.7)', color: 'black', 
  border: 'none', borderRadius: '50%', width: '30px', height: '30px', 
  fontSize: '1.5rem', fontWeight: 'bold'
};

const removeButtonStyle = {
  cursor: 'pointer', background: 'rgba(229, 9, 20, 0.8)', color: 'white', 
  border: 'none', borderRadius: '50%', width: '30px', height: '30px', 
  fontSize: '1.2rem', fontWeight: 'bold'
};

export default MovieCard; 