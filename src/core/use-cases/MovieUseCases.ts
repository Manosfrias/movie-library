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
import { createCreateMovieUseCase } from './CreateMovie';
import { createDeleteMovieUseCase } from './DeleteMovie';
import { createGetAllMoviesUseCase } from './GetAllMovies';
import { createGetMovieByIdUseCase } from './GetMovieById';
import { createToggleFavoriteUseCase } from './ToggleFavorite';
import { createUpdateMovieUseCase } from './UpdateMovie';

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
