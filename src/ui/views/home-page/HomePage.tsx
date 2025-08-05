import { AddNewMovie } from '@/ui/components/add-new-movie/AddNewMovie';
import FavoriteToggle from '@/ui/components/favorite-toggle/FavoriteToggle';
import FilterMovies from '@/ui/components/filter-movies/FilterMovies';
import MovieOfTheDay from '@/ui/components/movie-of-the-day/MovieOfTheDay';
import { MoviesList } from '@/ui/components/movies-list/MoviesList';
import OrderMovies from '@/ui/components/order-movies/OrderMovies';
import PageLayout from '@/ui/components/page-layout/PageLayout';
import SearchMovies from '@/ui/components/search-movies/SearchMovies';

export default function HomePage() {
  return (
    <PageLayout
      aside={
        <>
          <FavoriteToggle />
          <OrderMovies />
          <FilterMovies />
        </>
      }
      footer={<AddNewMovie />}
    >
      <>
        <SearchMovies />
        <MovieOfTheDay />
        <MoviesList />
      </>
    </PageLayout>
  );
}
