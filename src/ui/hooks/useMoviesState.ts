import { Movie } from '@/core/models/movie';
import { getMovieApplicationService } from '@/ui/hooks/useMovieService';
import { useEffect, useState } from 'react';

export const useMoviesState = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const movieService = getMovieApplicationService();
        const allMovies = await movieService.getAllMovies();
        setMovies(allMovies);
      } catch {
        throw new Error('Failed to load initial movies');
      } finally {
        setLoading(false);
      }
    };

    loadInitialMovies();
  }, []);

  return {
    movies,
    setMovies,
    loading,
    setLoading,
  };
};
