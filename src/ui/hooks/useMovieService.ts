import { createMovieRepository } from '@/core/infrastructure/repositories/RepositoryFactory';
import type { Movie } from '@/core/models/movie';
import { createMovieUseCases } from '@/core/use-cases/MovieUseCases';
import { useMemo } from 'react';

export interface MovieService {
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

export const useMovieService = (): MovieService => {
  const service = useMemo(() => {
    const repository = createMovieRepository();
    const useCases = createMovieUseCases(repository);

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
        return useCases.toggleFavorite.execute(id);
      },
    };
  }, []);

  return service;
};

export const createMovieApplicationService = (): MovieService => {
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
      return useCases.toggleFavorite.execute(id);
    },
  };
};

let movieServiceInstance: MovieService | null = null;

export const getMovieApplicationService = (): MovieService => {
  if (!movieServiceInstance) {
    movieServiceInstance = createMovieApplicationService();
  }
  return movieServiceInstance;
};
