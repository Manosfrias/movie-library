import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import type { GetAllMoviesUseCase } from '@/core/models/useCases';

export const createGetAllMoviesUseCase = (
  movieRepository: MovieRepository
): GetAllMoviesUseCase => ({
  execute: async (): Promise<Movie[]> => {
    try {
      return await movieRepository.findAll();
    } catch (error) {
      console.error('Error getting all movies:', error);
      throw new Error('Failed to retrieve movies');
    }
  },
});
