'use client';
import React from 'react';
import { MoviesListProps } from './MoviesList.types';
import MovieCard from '../movie-card/MovieCard';
import { useMovies } from '@/ui/context/MoviesContext';
import styles from './MoviesList.module.css';

export const MoviesList: React.FC<MoviesListProps> = () => {
  const { filteredMovies, loading, toggleFavorite } = useMovies();

  if (loading) {
    return <div className={styles.loading}>Cargando películas...</div>;
  }

  return (
    <div className={styles.moviesList}>
      <div className={styles.moviesGrid}>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
