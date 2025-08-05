'use client';
import MovieDetailContent from '@/ui/components/movie-detail-content/MovieDetailContent';
import MovieDetailSidebar from '@/ui/components/movie-detail-sidebar/MovieDetailSidebar';
import PageLayout from '@/ui/components/page-layout/PageLayout';
import { useMovies } from '@/ui/context/MoviesContext';
import { MovieDetailPageProps } from './MovieDetailPage.type';

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { movies } = useMovies();
  const currentMovie = movies.find((movie) => movie.id === params.id);
  const currentIndex = movies.findIndex((movie) => movie.id === params.id);
  const previousMovie = currentIndex > 0 ? movies[currentIndex - 1] : undefined;
  const nextMovie =
    currentIndex < movies.length - 1 ? movies[currentIndex + 1] : undefined;

  return (
    currentMovie && (
      <PageLayout
        aside={
          <MovieDetailSidebar
            previousMovieId={previousMovie?.id}
            nextMovieId={nextMovie?.id}
          />
        }
      >
        <MovieDetailContent movie={currentMovie} />
      </PageLayout>
    )
  );
}
