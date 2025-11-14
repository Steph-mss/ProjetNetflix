import React, { useState, useEffect } from 'react';
import { fetchSeries } from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';

function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true);
        const response = await fetchSeries();
        setSeries(response.data);
      } catch (error) {
        console.error("Erreur chargement séries:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSeries();
  }, []);

  if (loading) {
    return <div className="profile-page">Chargement des séries...</div>;
  }

  return (
    <div className="profile-page"> 
      <h2>Toutes les Séries</h2>
      <div className="favorites-grid"> 
        {series.map(serie => (
          <MovieCard 
            key={serie.id} 
            movie={serie} 
            mediaType="Serie" 
          />
        ))}
      </div>
    </div>
  );
}

export default Series;