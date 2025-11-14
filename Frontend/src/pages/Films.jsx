// src/pages/Films.jsx
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';

function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const response = await fetchMovies();
        setFilms(response.data);
      } catch (error) {
        console.error("Erreur chargement films:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return <div className="profile-page">Chargement des films...</div>;
  }

  return (
    <div className="profile-page"> {/* On réutilise le style */}
      <h2>Tous les Films</h2>
      <div className="favorites-grid"> {/* On réutilise le style */}
        {films.map(film => (
          <MovieCard 
            key={film.id} 
            movie={film} 
            mediaType="Film" // <-- **LA CORRECTION EST ICI**
          />
        ))}
      </div>
    </div>
  );
}

export default Films;