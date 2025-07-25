import React from 'react';
import styles from './HomePage.module.css';
import { useTexts } from '../../hooks/useTexts';
import { Movie } from '../../../core/models/movie';
import {
  MovieCard,
  SearchMovies,
  OrderMovies,
  MovieOfTheDay,
} from '@/ui/components';
import FilterMovies from '@/ui/components/filter-movies/FilterMovies';
import { MoviesList } from '@/ui/components/movies-list/MoviesList';

export default function HomePage() {
  const { getHomeText } = useTexts();

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.title}>{getHomeText('title')}</h1>
        <OrderMovies />
        <FilterMovies />
      </aside>
      <section className={styles.description}>
        <SearchMovies />
        <MovieOfTheDay />
        <MoviesList />
      </section>
    </main>
  );
}
