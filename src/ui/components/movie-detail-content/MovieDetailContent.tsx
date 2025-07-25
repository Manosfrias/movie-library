import React from 'react';
import { Movie } from '../../../core/models/movie';
import styles from './MovieDetailContent.module.css';

interface MovieDetailContentProps {
  movie: Movie;
}

export default function MovieDetailContent({ movie }: MovieDetailContentProps) {
  return (
    <div className={styles.content}>
      {/* Header de la película */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.favorite && (
            <span className={styles.favoritebadge}>⭐ Favorite</span>
          )}
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingValue}>{movie.rating.toFixed(1)}</span>
          <span className={styles.ratingLabel}>/ 10</span>
        </div>
      </header>

      {/* Información básica */}
      <section className={styles.basicInfo}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Director</span>
            <span className={styles.infoValue}>{movie.director}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Release Year</span>
            <span className={styles.infoValue}>{movie.releaseYear}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Genre</span>
            <span className={styles.genreTag}>{movie.genre}</span>
          </div>
        </div>
      </section>

      {/* Sección de descripción (placeholder) */}
      <section className={styles.descriptionSection}>
        <h2 className={styles.sectionTitle}>Plot Summary</h2>
        <p className={styles.description}>
          This is a placeholder for the movie description. In a real application, 
          this would contain the plot summary, cast information, and other details 
          about the movie. The movie &ldquo;{movie.title}&rdquo; directed by {movie.director} 
          was released in {movie.releaseYear} and belongs to the {movie.genre} genre.
        </p>
      </section>

      {/* Información adicional */}
      <section className={styles.additionalInfo}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{movie.rating}</span>
            <span className={styles.statLabel}>IMDb Rating</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{movie.releaseYear}</span>
            <span className={styles.statLabel}>Release Year</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{movie.genre}</span>
            <span className={styles.statLabel}>Primary Genre</span>
          </div>
        </div>
      </section>
    </div>
  );
}
