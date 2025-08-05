import { Movie } from '@/core/models/movie';
import { ApiMovieRequest, ApiMovieResponse } from '../../models/apiMovie.types';

export const toDomain = (apiMovie: ApiMovieResponse): Movie => ({
  id: apiMovie.id,
  title: apiMovie.title,
  releaseYear: apiMovie.releaseYear,
  genre: apiMovie.genre,
  director: apiMovie.director,
  rating: apiMovie.rating,
  favorite: apiMovie.favorite || false,
});

export const toApi = (movie: Omit<Movie, 'id'>): ApiMovieRequest => ({
  title: movie.title,
  releaseYear: movie.releaseYear,
  genre: movie.genre,
  director: movie.director,
  rating: movie.rating,
  favorite: movie.favorite,
});

export const toApiUpdate = (movie: Movie): ApiMovieRequest => ({
  title: movie.title,
  releaseYear: movie.releaseYear,
  genre: movie.genre,
  director: movie.director,
  rating: movie.rating,
  favorite: movie.favorite,
});

export const toDomainList = (apiMovies: ApiMovieResponse[]): Movie[] =>
  apiMovies.map(toDomain);
