import { createMovieRepository } from '@/core/infrastructure/repositories/RepositoryFactory';
import type { Movie } from '@/core/models/movie';
import { createMovieUseCases } from '@/core/use-cases/MovieUseCases';

/**
 * Interface para el servicio de aplicación de películas
 */
export interface MovieApplicationService {
  getAllMovies(): Promise<Movie[]>;
  getMovieById(id: string): Promise<Movie | null>;
  createMovie(movieData: Omit<Movie, 'id'>): Promise<Movie>;
  updateMovie(
    id: string,
    movieData: Partial<Omit<Movie, 'id'>>
  ): Promise<Movie | null>;
  deleteMovie(id: string): Promise<boolean>;
  toggleMovieFavorite(id: string): Promise<Movie | null>;
}

export const createMovieApplicationService = (): MovieApplicationService => {
  const movieRepository = createMovieRepository();
  const useCases = createMovieUseCases(movieRepository);

  return {
    getAllMovies: async (): Promise<Movie[]> => {
      return useCases.getAllMovies.execute();
    },

    getMovieById: async (id: string): Promise<Movie | null> => {
      return useCases.getMovieById.execute(id);
    },

    createMovie: async (movieData: Omit<Movie, 'id'>): Promise<Movie> => {
      return useCases.createMovie.execute(movieData);
    },

    updateMovie: async (
      id: string,
      movieData: Partial<Omit<Movie, 'id'>>
    ): Promise<Movie | null> => {
      return useCases.updateMovie.execute(id, movieData);
    },

    deleteMovie: async (id: string): Promise<boolean> => {
      return useCases.deleteMovie.execute(id);
    },

    toggleMovieFavorite: async (id: string): Promise<Movie | null> => {
      const movie = await useCases.getMovieById.execute(id);
      if (!movie) {
        throw new Error(`Movie with ID ${id} not found`);
      }

      return useCases.updateMovie.execute(id, { favorite: !movie.favorite });
    },
  };
};

// Singleton para mantener una única instancia del servicio
let movieServiceInstance: MovieApplicationService | null = null;

export const getMovieApplicationService = (): MovieApplicationService => {
  if (!movieServiceInstance) {
    movieServiceInstance = createMovieApplicationService();
  }
  return movieServiceInstance;
};
