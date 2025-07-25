'use client';
import React from 'react';
import { Movie } from '../../../core/models/movie';
import Badge from '../badge/Badge';
import MovieDetails from '../movie-details/MovieDetails';
import ViewDetails from '../view-details/ViewDetails';
import { MovieCardProps } from './MovieCard.types';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <a
      href={`/movies/${movie.id}`}
      className={styles.card}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(movie);
        }
      }}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{movie.title}</h3>
        {movie.favorite && <Badge type="favorite" />}
      </header>

      <article className={styles.movieInfo}>
        <MovieDetails
          director={movie.director}
          year={movie.releaseYear}
          rating={parseFloat(movie.rating.toFixed(1))}
        />
        <footer className={styles.genreWrapper}>
          <span className={styles.genre}>{movie.genre}</span>
        </footer>
      </article>

      <ViewDetails />
    </a>
  );
}
