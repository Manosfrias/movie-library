import type { Movie } from '@/core/models/movie';

export interface MovieValidationError extends Error {
  field: string;
  value: any;
}

export const createMovieValidationError = (
  field: string,
  value: any,
  message: string
): MovieValidationError => {
  const error = new Error(message) as MovieValidationError;
  error.field = field;
  error.value = value;
  return error;
};

export const validateMovieTitle = (title: string): void => {
  if (!title || title.trim() === '') {
    throw createMovieValidationError('title', title, 'El título de la película es requerido');
  }
};

export const validateMovieDirector = (director: string): void => {
  if (!director || director.trim() === '') {
    throw createMovieValidationError(
      'director',
      director,
      'El director de la película es requerido'
    );
  }
};

export const validateMovieGenre = (genre: string): void => {
  if (!genre || genre.trim() === '') {
    throw createMovieValidationError('genre', genre, 'El género de la película es requerido');
  }
};

export const validateMovieReleaseYear = (releaseYear: number): void => {
  const currentYear = new Date().getFullYear();
  const minYear = 1800;
  const maxYear = currentYear; // Cambio: solo hasta el año actual

  if (releaseYear < minYear || releaseYear > maxYear) {
    throw createMovieValidationError(
      'releaseYear',
      releaseYear,
      `El año de lanzamiento debe estar entre ${minYear} y ${maxYear}`
    );
  }
};

export const validateMovieRating = (rating: number): void => {
  if (rating < 0 || rating > 10) {
    throw createMovieValidationError(
      'rating',
      rating,
      'La calificación debe estar entre 0 y 10'
    );
  }
};

export const validateMovieData = (movieData: Omit<Movie, 'id'>): void => {
  validateMovieTitle(movieData.title);
  validateMovieDirector(movieData.director);
  validateMovieGenre(movieData.genre);
  validateMovieReleaseYear(movieData.releaseYear);
  validateMovieRating(movieData.rating);
};

export const sanitizeMovieData = (
  movieData: Omit<Movie, 'id'>
): Omit<Movie, 'id'> => ({
  ...movieData,
  title: movieData.title.trim(),
  director: movieData.director.trim(),
  genre: movieData.genre.trim(),
  favorite: movieData.favorite || false,
});
