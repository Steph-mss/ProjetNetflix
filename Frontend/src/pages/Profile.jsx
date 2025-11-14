import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { fetchFavorites, removeFavorite } from '../services/api.js';

function Profile() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetchFavorites(user.id);
      setFavorites(response.data); 
    } catch (error) {
      console.error("Erreur chargement favoris:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (mongoId) => {
    if (!mongoId) {
      alert("Erreur : ID du favori manquant.");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir retirer ce favori ?")) {
      try {
        await removeFavorite(mongoId);
        setFavorites(currentFavorites => 
          currentFavorites.filter(fav => fav._id !== mongoId) 
        );
        alert("Favori retiré !");
      } catch (error) {
        console.error("Erreur suppression favori:", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (!user) {
    return <div>Vous devez être connecté.</div>;
  }

  return (
    <div className="profile-page">
      <h2>Profil de {user.nom}</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout} className="logout-button">Se déconnecter</button>
      <hr style={{margin: '20px 0'}} />
      <h3>Mes Favoris</h3>
      
      {loading && <p>Chargement des favoris...</p>}
      
      {!loading && favorites.length === 0 && (
        <p>Vous n'avez pas encore de favoris.</p>
      )}

      <div className="favorites-grid">
        {favorites.map(fav => (
          <MovieCard 
            key={fav._id} 
            movie={fav}   
            mediaType={fav.type} 
            onRemove={() => handleRemoveFavorite(fav._id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;