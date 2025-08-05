import { useCallback } from 'react';
import { Movie } from '../../core/models/movie';
import {
  addNewMovie,
  toggleMovieFavorite
} from '../context/movieOperations';
import { useMovieService } from '../hooks/useMovieService';

interface UseMovieOperationsProps {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMovieOperations = ({
  setMovies,
  setLoading,
}: UseMovieOperationsProps) => {
  const movieService = useMovieService();

  const toggleFavorite = useCallback(
    async (movieId: string) => {
      try {
        const updatedMovie = await movieService.toggleMovieFavorite(movieId);
        if (!updatedMovie) return;

        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieId ? updatedMovie : movie
          )
        );
      } catch (error) {
        setMovies((prevMovies) => toggleMovieFavorite(prevMovies, movieId));
        throw error;
      }
    },
    [setMovies, movieService]
  );

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const moviesData = await movieService.getAllMovies();
      setMovies(moviesData);
    } catch {
      throw new Error('Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [setMovies, setLoading, movieService]);

  const addMovie = useCallback(
    async (movie: Omit<Movie, 'id'>) => {
      setLoading(true);
      try {
        const savedMovie = await movieService.createMovie(movie);
        setMovies((prevMovies) => addNewMovie(prevMovies, savedMovie));
        return savedMovie;
      } catch {
        throw new Error('Failed to add movie');
      } finally {
        setLoading(false);
      }
    },
    [setMovies, setLoading, movieService]
  );

  const updateMovie = useCallback(
    async (id: string, movieData: Partial<Omit<Movie, 'id'>>) => {
      setLoading(true);
      try {
        const updatedMovie = await movieService.updateMovie(id, movieData);
        if (!updatedMovie) return null;

        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie.id === id ? updatedMovie : movie))
        );
        return updatedMovie;
      } catch {
        throw new Error('Failed to update movie');
      } finally {
        setLoading(false);
      }
    },
    [setMovies, setLoading, movieService]
  );

  const deleteMovie = useCallback(
    async (movieId: string) => {
      setLoading(true);
      try {
        await movieService.deleteMovie(movieId);
        // Recargar todas las películas para obtener el estado actualizado
        // (incluye restauración automática de datos de muestra si es necesario)
        const updatedMovies = await movieService.getAllMovies();
        setMovies(updatedMovies);
      } catch {
        throw new Error('Failed to delete movie');
      } finally {
        setLoading(false);
      }
    },
    [setMovies, setLoading, movieService]
  );

  return {
    toggleFavorite,
    loadMovies,
    addMovie,
    updateMovie,
    deleteMovie,
  };
};
