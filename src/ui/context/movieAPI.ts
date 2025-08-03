import { Movie } from '../../core/models/movie';
import { sampleMovies } from '../../../sample';

export const loadMoviesFromAPI = async (): Promise<Movie[]> => {
  // Simular una API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // En una app real: const response = await fetch('/api/movies');
  // const moviesData = await response.json();
  // return moviesData;
  return sampleMovies;
};

export const saveMovieToAPI = async (
  movie: Omit<Movie, 'id'>
): Promise<Movie> => {
  // Simular API call para agregar película
  await new Promise((resolve) => setTimeout(resolve, 500));
  // En una app real: const response = await fetch('/api/movies', { method: 'POST', body: JSON.stringify(movie) });
  // return await response.json();
  return {
    ...movie,
    id: Date.now().toString(),
  };
};

export const deleteMovieFromAPI = async (movieId: string): Promise<void> => {
  // Simular API call para eliminar película
  await new Promise((resolve) => setTimeout(resolve, 500));
  // En una app real: await fetch(`/api/movies/${movieId}`, { method: 'DELETE' });
};
