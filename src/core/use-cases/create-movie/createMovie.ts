import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import type { CreateMovieUseCase } from '@/core/models/useCases';
import {
  sanitizeMovieData,
  validateMovieData,
} from '@/core/utils/movieValidation';

export const createCreateMovieUseCase = (
  movieRepository: MovieRepository
): CreateMovieUseCase => ({
  execute: async (movieData: Omit<Movie, 'id'>): Promise<Movie> => {
    validateMovieData(movieData);

    const sanitizedData = sanitizeMovieData(movieData);

    const movieToCreate: Movie = {
      id: '',
      ...sanitizedData,
    };
    try {
      return await movieRepository.create(movieToCreate);
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new Error('Failed to create movie');
    }
  },
});
