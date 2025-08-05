import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import type { ToggleFavoriteUseCase } from '@/core/models/useCases';

export const createToggleFavoriteUseCase = (
  movieRepository: MovieRepository
): ToggleFavoriteUseCase => ({
  execute: async (id: string): Promise<Movie | null> => {
    if (!id || id.trim() === '') {
      throw new Error('Movie ID is required');
    }

    const existingMovie = await movieRepository.findById(id);
    if (!existingMovie) {
      throw new Error(`Movie with ID ${id} not found`);
    }

    const updatedMovie: Movie = {
      ...existingMovie,
      favorite: !existingMovie.favorite,
    };

    try {
      return await movieRepository.update(id, updatedMovie);
    } catch (error) {
      console.error('Error toggling movie favorite:', error);
      throw new Error(`Failed to toggle favorite for movie with ID: ${id}`);
    }
  },
});
