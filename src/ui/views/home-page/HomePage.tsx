import React from 'react';
import styles from './HomePage.module.css';
import { useTexts } from '../../hooks/useTexts';
import {
  SearchMovies,
  OrderMovies,
  MovieOfTheDay,
  FavoriteToggle,
} from '@/ui/components';
import FilterMovies from '@/ui/components/filter-movies/FilterMovies';
import { MoviesList } from '@/ui/components/movies-list/MoviesList';

export default function HomePage() {
  const { getHomeText } = useTexts();

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.title}>{getHomeText('title')}</h1>
        <FavoriteToggle />
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
