import type { MovieRepository } from '@/core/models/repository';
import type {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetAllMoviesUseCase,
  GetMovieByIdUseCase,
  GetMovieOfTheDayUseCase,
  MovieUseCases,
  ToggleFavoriteUseCase,
  UpdateMovieUseCase,
} from '@/core/models/useCases';
import { createCreateMovieUseCase } from './create-movie/createMovie';
import { createDeleteMovieUseCase } from './delete-movie/deleteMovie';
import { createGetAllMoviesUseCase } from './get-all-movies/getAllMovies';
import { createGetMovieByIdUseCase } from './get-movie-by-id/getMovieById';
import { createGetMovieOfTheDayUseCase } from './get-movie-of-the-day/getMovieOfTheDay';
import { createToggleFavoriteUseCase } from './toggle-favorite/toggleFavorite';
import { createUpdateMovieUseCase } from './update-movie/updateMovie';

export const createMovieUseCases = (
  movieRepository: MovieRepository
): MovieUseCases => ({
  getAllMovies: createGetAllMoviesUseCase(movieRepository),
  getMovieById: createGetMovieByIdUseCase(movieRepository),
  createMovie: createCreateMovieUseCase(movieRepository),
  updateMovie: createUpdateMovieUseCase(movieRepository),
  deleteMovie: createDeleteMovieUseCase(movieRepository),
  toggleFavorite: createToggleFavoriteUseCase(movieRepository),
  getMovieOfTheDay: createGetMovieOfTheDayUseCase(movieRepository),
});

export type {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetAllMoviesUseCase,
  GetMovieByIdUseCase,
  GetMovieOfTheDayUseCase,
  MovieUseCases,
  ToggleFavoriteUseCase,
  UpdateMovieUseCase,
};
