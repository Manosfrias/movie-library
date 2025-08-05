import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';

export interface GetMovieOfTheDayUseCase {
  (): Promise<Movie | null>;
}

export const createGetMovieOfTheDayUseCase = (
  movieRepository: MovieRepository
): GetMovieOfTheDayUseCase => {
  return async (): Promise<Movie | null> => {
    try {
      const allMovies = await movieRepository.findAll();
      const favoriteMovies = allMovies.filter(
        (movie) => movie.favorite === true
      );

      if (favoriteMovies.length === 0) {
        return null;
      }

      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const randomIndex = dayOfYear % favoriteMovies.length;

      return favoriteMovies[randomIndex];
    } catch (error) {
      console.error('Error getting movie of the day:', error);
      return null;
    }
  };
};
