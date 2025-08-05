import type { MovieRepository } from '@/core/models/repository';
import type {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetAllMoviesUseCase,
  GetMovieByIdUseCase,
  MovieUseCases,
  ToggleFavoriteUseCase,
  UpdateMovieUseCase,
} from '@/core/models/useCases';
import { createCreateMovieUseCase } from './create-movie';
import { createDeleteMovieUseCase } from './delete-movie';
import { createGetAllMoviesUseCase } from './get-all-movies';
import { createGetMovieByIdUseCase } from './get-movie-by-id';
import { createToggleFavoriteUseCase } from './toggle-favorite';
import { createUpdateMovieUseCase } from './update-movie';

export const createMovieUseCases = (
  movieRepository: MovieRepository
): MovieUseCases => ({
  getAllMovies: createGetAllMoviesUseCase(movieRepository),
  getMovieById: createGetMovieByIdUseCase(movieRepository),
  createMovie: createCreateMovieUseCase(movieRepository),
  updateMovie: createUpdateMovieUseCase(movieRepository),
  deleteMovie: createDeleteMovieUseCase(movieRepository),
  toggleFavorite: createToggleFavoriteUseCase(movieRepository),
});

export type {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  GetAllMoviesUseCase,
  GetMovieByIdUseCase,
  MovieUseCases,
  ToggleFavoriteUseCase,
  UpdateMovieUseCase,
};
