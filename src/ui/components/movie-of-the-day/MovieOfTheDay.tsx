'use client';
import { useMovieOfTheDay } from '@/ui/hooks/useMovieOfTheDay';
import { useTexts } from '@/ui/hooks/useTexts';
import Badge from '../badge/Badge';
import MovieDetails from '../movie-details/MovieDetails';
import ViewDetails from '../view-details/ViewDetails';
import styles from './MovieOfTheDay.module.css';

export default function MovieOfTheDay() {
  const { getMovieOfTheDayText } = useTexts();
  const { movieOfTheDay, loading, error } = useMovieOfTheDay();

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{getMovieOfTheDayText('title')}</h2>
          <Badge type="featured" />
        </header>
        <div className={styles.movieInfo}>
          <p>Cargando película del día...</p>
        </div>
      </div>
    );
  }

  if (error || !movieOfTheDay) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{getMovieOfTheDayText('title')}</h2>
          <Badge type="featured" />
        </header>
        <div className={styles.movieInfo}>
          <p>{error || 'No hay películas favoritas disponibles'}</p>
        </div>
      </div>
    );
  }

  return (
    <a href={`/${movieOfTheDay.id}`} className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{getMovieOfTheDayText('title')}</h2>
        <Badge type="featured" />
      </header>

      <article className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{movieOfTheDay.title}</h3>
        <MovieDetails
          director={movieOfTheDay.director}
          year={movieOfTheDay.releaseYear}
          rating={movieOfTheDay.rating}
        />
      </article>

      <ViewDetails />
    </a>
  );
}
