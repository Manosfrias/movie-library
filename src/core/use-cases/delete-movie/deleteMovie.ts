import type { MovieRepository } from '@/core/models/repository';
import type { DeleteMovieUseCase } from '@/core/models/useCases';

export const createDeleteMovieUseCase = (
  movieRepository: MovieRepository
): DeleteMovieUseCase => ({
  execute: async (id: string): Promise<boolean> => {
    if (!id || id.trim() === '') {
      throw new Error('Movie ID is required');
    }

    const existingMovie = await movieRepository.findById(id);
    if (!existingMovie) {
      throw new Error(`Movie with ID ${id} not found`);
    }

    try {
      return await movieRepository.delete(id);
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw new Error(`Failed to delete movie with ID: ${id}`);
    }
  },
});
