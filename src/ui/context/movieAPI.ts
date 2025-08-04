import { Movie } from '@/core/models/movie';
import { createMovieApplicationService } from '../hooks/useMovieService';

const movieService = createMovieApplicationService();

export const loadMoviesFromAPI = async (): Promise<Movie[]> => {
  return movieService.getAllMovies();
};

export const getMovieByIdFromAPI = async (
  id: string
): Promise<Movie | null> => {
  return movieService.getMovieById(id);
};

export const saveMovieToAPI = async (
  movie: Omit<Movie, 'id'>
): Promise<Movie> => {
  return movieService.createMovie(movie);
};

export const updateMovieInAPI = async (
  id: string,
  movieData: Partial<Omit<Movie, 'id'>>
): Promise<Movie | null> => {
  return movieService.updateMovie(id, movieData);
};

export const deleteMovieFromAPI = async (movieId: string): Promise<void> => {
  const success = await movieService.deleteMovie(movieId);
  if (!success) {
    throw new Error(`Failed to delete movie with ID: ${movieId}`);
  }
};

export const toggleMovieFavoriteInAPI = async (
  movieId: string
): Promise<Movie | null> => {
  return movieService.toggleMovieFavorite(movieId);
};
