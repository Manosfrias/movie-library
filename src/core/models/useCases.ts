import type { Movie } from './movie';

export interface GetAllMoviesUseCase {
  execute(): Promise<Movie[]>;
}

export interface GetMovieByIdUseCase {
  execute(id: string): Promise<Movie | null>;
}

export interface CreateMovieUseCase {
  execute(movieData: Omit<Movie, 'id'>): Promise<Movie>;
}

export interface UpdateMovieUseCase {
  execute(
    id: string,
    movieData: Partial<Omit<Movie, 'id'>>
  ): Promise<Movie | null>;
}

export interface DeleteMovieUseCase {
  execute(id: string): Promise<boolean>;
}

export interface MovieUseCases {
  getAllMovies: GetAllMoviesUseCase;
  getMovieById: GetMovieByIdUseCase;
  createMovie: CreateMovieUseCase;
  updateMovie: UpdateMovieUseCase;
  deleteMovie: DeleteMovieUseCase;
}
