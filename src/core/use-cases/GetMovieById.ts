import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import type { GetMovieByIdUseCase } from '@/core/models/useCases';

export const createGetMovieByIdUseCase = (
  movieRepository: MovieRepository
): GetMovieByIdUseCase => ({
  execute: async (id: string): Promise<Movie | null> => {
    if (!id || id.trim() === '') {
      throw new Error('Movie ID is required');
    }

    try {
      return await movieRepository.findById(id);
    } catch (error) {
      console.error('Error getting movie by ID:', error);
      throw new Error(`Failed to retrieve movie with ID: ${id}`);
    }
  },
});
