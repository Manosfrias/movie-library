import FavoriteToggle from '@/ui/components/favorite-toggle/FavoriteToggle';
import FilterMovies from '@/ui/components/filter-movies/FilterMovies';
import MovieOfTheDay from '@/ui/components/movie-of-the-day/MovieOfTheDay';
import { MoviesList } from '@/ui/components/movies-list/MoviesList';
import OrderMovies from '@/ui/components/order-movies/OrderMovies';
import SearchMovies from '@/ui/components/search-movies/SearchMovies';
import { useTexts } from '../../hooks/useTexts';
import styles from './HomePage.module.css';

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
