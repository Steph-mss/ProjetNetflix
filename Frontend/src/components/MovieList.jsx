// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard.jsx';

// Accepter "mediaType"
function MovieList({ title, movies, mediaType }) {
  return (
    <div className="movie-list">
      <h2>{title}</h2>
      <div className="movie-row">
        {movies.map(movie => (
          // Passer "mediaType" à la carte
          <MovieCard key={movie.id} movie={movie} mediaType={mediaType} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;