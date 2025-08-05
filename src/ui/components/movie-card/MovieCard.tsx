'use client';
import Badge from '../badge/Badge';
import MovieDetails from '../movie-details/MovieDetails';
import ViewDetails from '../view-details/ViewDetails';
import styles from './MovieCard.module.css';
import { MovieCardProps } from './MovieCard.types';

export default function MovieCard({
  movie,
  onSelect,
  onToggleFavorite,
}: MovieCardProps) {
  const handleFavoriteToggle = () => {
    if (onToggleFavorite) {
      onToggleFavorite(movie.id);
    }
  };

  return (
    <a
      href={`/${movie.id}`}
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
        <Badge
          type="favorite"
          active={!!movie.favorite}
          onClick={handleFavoriteToggle}
        />
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
