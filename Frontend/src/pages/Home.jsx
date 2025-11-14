// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList.jsx';
import HeroBanner from '../components/HeroBanner.jsx'; // <-- 1. On importe le composant
import { fetchMovies, fetchSeries } from '../services/api.js';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [heroSerie, setHeroSerie] = useState(null); // <-- 2. State pour la série en vedette
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [moviesResponse, seriesResponse] = await Promise.all([
          fetchMovies(),
          fetchSeries()
        ]);
        
        setPopularMovies(moviesResponse.data);
        setPopularSeries(seriesResponse.data);

        // --- 3. On prend la première série et on la met dans le state ---
        if (seriesResponse.data && seriesResponse.data.length > 0) {
          setHeroSerie(seriesResponse.data[0]); 
        }
        
      } catch (error) {
        console.error("Erreur chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); // [] = s'exécute au montage

  if (loading) {
    return <div style={{paddingTop: '100px', paddingLeft: '50px'}}>Chargement...</div>;
  }

  return (
    <div className="home-page">
      
      {/* 4. On UTILISE le composant et on lui PASSE la série */}
      <HeroBanner serie={heroSerie} />

      {/* Le reste de la page */}
      <MovieList title="Films Populaires" movies={popularMovies} mediaType="Film" />
      <MovieList title="Séries Populaires" movies={popularSeries} mediaType="Serie" />
    </div>
  );
}

export default Home;