'use client';
import React from 'react';
import { Movie } from '../../../core/models/movie';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
}

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
      <div className={styles.header}>
        <h3 className={styles.title}>{movie.title}</h3>
        {movie.favorite && <span className={styles.badge}>Favorite</span>}
      </div>

      <div className={styles.movieInfo}>
        <div className={styles.details}>
          <span className={styles.director}>Dir. {movie.director}</span>
          <span className={styles.year}>{movie.releaseYear}</span>
          <span className={styles.rating}>⭐ {movie.rating.toFixed(1)}</span>
        </div>
        <div className={styles.genreWrapper}>
          <span className={styles.genre}>{movie.genre}</span>
        </div>
      </div>
    </a>
  );
}
