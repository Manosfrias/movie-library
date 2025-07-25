'use client';
import React, { useState } from 'react';
import { Movie, MoviesListProps } from './MoviesList.types';
import MovieCard from '../movie-card/MovieCard';
import { sampleMovies } from './sample';
import styles from './MoviesList.module.css';

export const MoviesList: React.FC<MoviesListProps> = () => {
  const movies = sampleMovies;
  const [movieList, setMovieList] = useState<Movie[]>(movies);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <div className={styles.loading}>Cargando películas...</div>;
  }

  return (
    <div className={styles.moviesList}>
      <div className={styles.moviesGrid}>
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
