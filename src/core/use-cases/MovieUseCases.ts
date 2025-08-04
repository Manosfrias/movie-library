import type { MovieRepository } from '@/core/models/repository';
import type {
    CreateMovieUseCase,
    DeleteMovieUseCase,
    GetAllMoviesUseCase,
    GetMovieByIdUseCase,
    MovieUseCases,
    UpdateMovieUseCase,
} from '@/core/models/useCases';
import { createCreateMovieUseCase } from './CreateMovie';
import { createDeleteMovieUseCase } from './DeleteMovie';
import { createGetAllMoviesUseCase } from './GetAllMovies';
import { createGetMovieByIdUseCase } from './GetMovieById';
import { createUpdateMovieUseCase } from './UpdateMovie';

export const createMovieUseCases = (movieRepository: MovieRepository): MovieUseCases => ({
  getAllMovies: createGetAllMoviesUseCase(movieRepository),
  getMovieById: createGetMovieByIdUseCase(movieRepository),
  createMovie: createCreateMovieUseCase(movieRepository),
  updateMovie: createUpdateMovieUseCase(movieRepository),
  deleteMovie: createDeleteMovieUseCase(movieRepository),
});

// Re-exportar tipos para facilitar el uso
export type {
    CreateMovieUseCase, DeleteMovieUseCase, GetAllMoviesUseCase,
    GetMovieByIdUseCase, MovieUseCases, UpdateMovieUseCase
};

