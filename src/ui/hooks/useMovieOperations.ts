import { useCallback } from 'react';
import { Movie } from '../../core/models/movie';
import {
  toggleMovieFavorite,
  addNewMovie,
  removeMovie,
} from '../context/movieOperations';
import {
  loadMoviesFromAPI,
  saveMovieToAPI,
  deleteMovieFromAPI,
} from '../context/movieAPI';

interface UseMovieOperationsProps {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMovieOperations = ({
  setMovies,
  setLoading,
}: UseMovieOperationsProps) => {
  const toggleFavorite = useCallback(
    (movieId: string) => {
      setMovies((prevMovies) => toggleMovieFavorite(prevMovies, movieId));
    },
    [setMovies]
  );

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const moviesData = await loadMoviesFromAPI();
      setMovies(moviesData);
    } catch (error) {
      console.error('Error loading movies:', error);
      throw error; // Re-throw para que el componente pueda manejar el error
    } finally {
      setLoading(false);
    }
  }, [setMovies, setLoading]);

  const addMovie = useCallback(
    async (movie: Omit<Movie, 'id'>) => {
      setLoading(true);
      try {
        const savedMovie = await saveMovieToAPI(movie);
        setMovies((prevMovies) => addNewMovie(prevMovies, savedMovie));
      } catch (error) {
        console.error('Error adding movie:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setMovies, setLoading]
  );

  const deleteMovie = useCallback(
    async (movieId: string) => {
      setLoading(true);
      try {
        await deleteMovieFromAPI(movieId);
        setMovies((prevMovies) => removeMovie(prevMovies, movieId));
      } catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setMovies, setLoading]
  );

  return {
    toggleFavorite,
    loadMovies,
    addMovie,
    deleteMovie,
  };
};
