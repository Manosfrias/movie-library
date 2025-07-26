import React from 'react';
import Badge from '../badge/Badge';
import ViewDetails from '../view-details/ViewDetails';
import MovieDetails from '../movie-details/MovieDetails';
import { useTexts } from '@/ui/hooks/useTexts';
import styles from './MovieOfTheDay.module.css';

export default function MovieOfTheDay() {
  const { getMovieOfTheDayText } = useTexts();

  return (
    <a href="/1" className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{getMovieOfTheDayText('title')}</h2>
        <Badge type="featured" />
      </header>

      <article className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>The Shawshank Redemption</h3>
        <MovieDetails director="Frank Darabont" year={1994} rating={9.3} />
      </article>

      <ViewDetails />
    </a>
  );
}
