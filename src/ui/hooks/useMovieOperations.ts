import { useCallback } from 'react';
import { Movie } from '../../core/models/movie';
import {
  deleteMovieFromAPI,
  loadMoviesFromAPI,
  saveMovieToAPI,
  toggleMovieFavoriteInAPI,
  updateMovieInAPI,
} from '../context/movieAPI';
import {
  addNewMovie,
  removeMovie,
  toggleMovieFavorite,
} from '../context/movieOperations';

interface UseMovieOperationsProps {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMovieOperations = ({
  setMovies,
  setLoading,
}: UseMovieOperationsProps) => {
  const toggleFavorite = useCallback(
    async (movieId: string) => {
      try {
        const updatedMovie = await toggleMovieFavoriteInAPI(movieId);
        if (updatedMovie) {
          setMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie.id === movieId ? updatedMovie : movie
            )
          );
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        setMovies((prevMovies) => toggleMovieFavorite(prevMovies, movieId));
        throw error;
      }
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
      throw error;
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
        return savedMovie;
      } catch (error) {
        console.error('Error adding movie:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setMovies, setLoading]
  );

  const updateMovie = useCallback(
    async (id: string, movieData: Partial<Omit<Movie, 'id'>>) => {
      setLoading(true);
      try {
        const updatedMovie = await updateMovieInAPI(id, movieData);
        if (updatedMovie) {
          setMovies((prevMovies) =>
            prevMovies.map((movie) => (movie.id === id ? updatedMovie : movie))
          );
        }
        return updatedMovie;
      } catch (error) {
        console.error('Error updating movie:', error);
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
    updateMovie,
    deleteMovie,
  };
};
