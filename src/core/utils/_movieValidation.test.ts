import { describe, expect, it } from 'vitest';
import {
  createMovieValidationError,
  sanitizeMovieData,
  validateMovieDirector,
  validateMovieGenre,
  validateMovieRating,
  validateMovieReleaseYear,
  validateMovieTitle,
} from './movieValidation';

describe('Movie Validation', () => {
  describe('validateMovieTitle', () => {
    it('should pass for valid title', () => {
      expect(() => validateMovieTitle('Valid Title')).not.toThrow();
    });

    it('should throw error for empty title', () => {
      expect(() => validateMovieTitle('')).toThrow(
        'El título de la película es requerido'
      );
    });

    it('should throw error for whitespace-only title', () => {
      expect(() => validateMovieTitle('   ')).toThrow(
        'El título de la película es requerido'
      );
    });
  });

  describe('validateMovieDirector', () => {
    it('should pass for valid director', () => {
      expect(() => validateMovieDirector('Christopher Nolan')).not.toThrow();
    });

    it('should throw error for empty director', () => {
      expect(() => validateMovieDirector('')).toThrow(
        'El director de la película es requerido'
      );
    });
  });

  describe('validateMovieGenre', () => {
    it('should pass for valid genre', () => {
      expect(() => validateMovieGenre('Sci-Fi')).not.toThrow();
    });

    it('should throw error for empty genre', () => {
      expect(() => validateMovieGenre('')).toThrow(
        'El género de la película es requerido'
      );
    });
  });

  describe('validateMovieReleaseYear', () => {
    it('should pass for current year', () => {
      const currentYear = new Date().getFullYear();
      expect(() => validateMovieReleaseYear(currentYear)).not.toThrow();
    });

    it('should pass for year 1900', () => {
      expect(() => validateMovieReleaseYear(1900)).not.toThrow();
    });

    it('should throw error for year before 1800', () => {
      expect(() => validateMovieReleaseYear(1799)).toThrow(
        'El año de lanzamiento debe estar entre'
      );
    });

    it('should throw error for year too far in future', () => {
      const nextYear = new Date().getFullYear() + 1; // Cambio: ahora cualquier año futuro debe fallar
      expect(() => validateMovieReleaseYear(nextYear)).toThrow(
        'El año de lanzamiento debe estar entre'
      );
    });
  });

  describe('validateMovieRating', () => {
    it('should pass for rating 5.5', () => {
      expect(() => validateMovieRating(5.5)).not.toThrow();
    });

    it('should pass for rating 0', () => {
      expect(() => validateMovieRating(0)).not.toThrow();
    });

    it('should pass for rating 10', () => {
      expect(() => validateMovieRating(10)).not.toThrow();
    });

    it('should throw error for negative rating', () => {
      expect(() => validateMovieRating(-1)).toThrow(
        'La calificación debe estar entre 0 y 10'
      );
    });

    it('should throw error for rating above 10', () => {
      expect(() => validateMovieRating(11)).toThrow(
        'La calificación debe estar entre 0 y 10'
      );
    });
  });

  describe('sanitizeMovieData', () => {
    it('should trim string fields and set default favorite', () => {
      const movieData = {
        title: '  Title  ',
        director: '  Director  ',
        genre: '  Genre  ',
        releaseYear: 2023,
        rating: 8.5,
      };

      const result = sanitizeMovieData(movieData);

      expect(result).toEqual({
        title: 'Title',
        director: 'Director',
        genre: 'Genre',
        releaseYear: 2023,
        rating: 8.5,
        favorite: false,
      });
    });

    it('should preserve existing favorite value', () => {
      const movieData = {
        title: 'Title',
        director: 'Director',
        genre: 'Genre',
        releaseYear: 2023,
        rating: 8.5,
        favorite: true,
      };

      const result = sanitizeMovieData(movieData);

      expect(result.favorite).toBe(true);
    });
  });

  describe('createMovieValidationError', () => {
    it('should create error with field and value properties', () => {
      const error = createMovieValidationError(
        'title',
        '',
        'Title is required'
      );

      expect(error.message).toBe('Title is required');
      expect(error.field).toBe('title');
      expect(error.value).toBe('');
    });
  });
});
