import type { Movie } from '@/core/models/movie';
import { describe, expect, it } from 'vitest';
import {
  calculateAverageRating,
  compareMovies,
  createSearchIndex,
  formatDirector,
  formatGenre,
  formatRating,
  formatTitle,
  formatYear,
  getFavoriteMovies,
  getMovieDisplayName,
  getMoviesByDecade,
  getMovieSearchableText,
  getRecentMovies,
  getTopRatedMovies,
  highlightText,
  isDuplicateMovie,
  isValidMovieData,
  isValidRating,
  isValidYear,
  sanitizeMovieData,
} from './movieUtils';

describe('movieUtils', () => {
  const sampleMovies: Movie[] = [
    {
      id: '1',
      title: 'The Matrix',
      director: 'The Wachowskis',
      genre: 'Sci-Fi',
      releaseYear: 1999,
      rating: 8.7,
      favorite: true,
    },
    {
      id: '2',
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Thriller',
      releaseYear: 2010,
      rating: 8.8,
      favorite: false,
    },
    {
      id: '3',
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      genre: 'Action',
      releaseYear: 2008,
      rating: 9.0,
      favorite: true,
    },
  ];

  describe('formatting utilities', () => {
    describe('formatRating', () => {
      it('should format rating with default 1 decimal', () => {
        expect(formatRating(8.7654)).toBe('8.8');
        expect(formatRating(9)).toBe('9.0');
      });

      it('should format rating with specified decimals', () => {
        expect(formatRating(8.7654, 2)).toBe('8.77');
        expect(formatRating(8.7654, 0)).toBe('9');
      });
    });

    describe('formatYear', () => {
      it('should convert year to string', () => {
        expect(formatYear(2023)).toBe('2023');
        expect(formatYear(1999)).toBe('1999');
      });
    });

    describe('formatTitle', () => {
      it('should trim whitespace from title', () => {
        expect(formatTitle('  The Matrix  ')).toBe('The Matrix');
        expect(formatTitle('Inception')).toBe('Inception');
      });
    });

    describe('formatDirector', () => {
      it('should trim whitespace from director', () => {
        expect(formatDirector('  Christopher Nolan  ')).toBe(
          'Christopher Nolan'
        );
        expect(formatDirector('The Wachowskis')).toBe('The Wachowskis');
      });
    });

    describe('formatGenre', () => {
      it('should trim whitespace from genre', () => {
        expect(formatGenre('  Sci-Fi  ')).toBe('Sci-Fi');
        expect(formatGenre('Action')).toBe('Action');
      });
    });
  });

  describe('movie data utilities', () => {
    describe('getMovieDisplayName', () => {
      it('should return title with year in parentheses', () => {
        expect(getMovieDisplayName(sampleMovies[0])).toBe('The Matrix (1999)');
        expect(getMovieDisplayName(sampleMovies[1])).toBe('Inception (2010)');
      });
    });

    describe('getMovieSearchableText', () => {
      it('should return lowercase concatenated movie data', () => {
        const result = getMovieSearchableText(sampleMovies[0]);
        expect(result).toBe('the matrix the wachowskis sci-fi 1999 8.7');
      });
    });

    describe('isValidRating', () => {
      it('should return true for valid ratings', () => {
        expect(isValidRating(0)).toBe(true);
        expect(isValidRating(5.5)).toBe(true);
        expect(isValidRating(10)).toBe(true);
      });

      it('should return false for invalid ratings', () => {
        expect(isValidRating(-1)).toBe(false);
        expect(isValidRating(11)).toBe(false);
        expect(isValidRating(100)).toBe(false);
      });
    });

    describe('isValidYear', () => {
      it('should return true for valid years', () => {
        expect(isValidYear(1800)).toBe(true);
        expect(isValidYear(2000)).toBe(true);
        expect(isValidYear(new Date().getFullYear())).toBe(true);
      });

      it('should return false for invalid years', () => {
        expect(isValidYear(1799)).toBe(false);
        expect(isValidYear(new Date().getFullYear() + 1)).toBe(false);
      });
    });
  });

  describe('movie statistics', () => {
    describe('calculateAverageRating', () => {
      it('should calculate correct average rating', () => {
        const result = calculateAverageRating(sampleMovies);
        expect(result).toBe(8.83); // (8.7 + 8.8 + 9.0) / 3 = 8.83
      });

      it('should return 0 for empty array', () => {
        expect(calculateAverageRating([])).toBe(0);
      });

      it('should handle single movie', () => {
        expect(calculateAverageRating([sampleMovies[0]])).toBe(8.7);
      });
    });

    describe('getTopRatedMovies', () => {
      it('should return movies sorted by rating descending', () => {
        const result = getTopRatedMovies(sampleMovies, 2);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('The Dark Knight');
        expect(result[1].title).toBe('Inception');
      });

      it('should return all movies if count exceeds array length', () => {
        const result = getTopRatedMovies(sampleMovies, 10);
        expect(result).toHaveLength(3);
      });

      it('should default to 5 movies', () => {
        const result = getTopRatedMovies(sampleMovies);
        expect(result).toHaveLength(3); // less than 5 available
      });
    });

    describe('getRecentMovies', () => {
      it('should return movies sorted by year descending', () => {
        const result = getRecentMovies(sampleMovies, 2);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('Inception'); // 2010
        expect(result[1].title).toBe('The Dark Knight'); // 2008
      });
    });

    describe('getFavoriteMovies', () => {
      it('should return only favorite movies', () => {
        const result = getFavoriteMovies(sampleMovies);
        expect(result).toHaveLength(2);
        expect(result.every((movie) => movie.favorite)).toBe(true);
      });

      it('should return empty array when no favorites', () => {
        const moviesWithoutFavorites = sampleMovies.map((m) => ({
          ...m,
          favorite: false,
        }));
        const result = getFavoriteMovies(moviesWithoutFavorites);
        expect(result).toEqual([]);
      });
    });

    describe('getMoviesByDecade', () => {
      it('should group movies by decade', () => {
        const result = getMoviesByDecade(sampleMovies);
        expect(result).toEqual({
          '1990s': [sampleMovies[0]], // The Matrix (1999)
          '2000s': [sampleMovies[2]], // The Dark Knight (2008)
          '2010s': [sampleMovies[1]], // Inception (2010)
        });
      });

      it('should handle empty array', () => {
        const result = getMoviesByDecade([]);
        expect(result).toEqual({});
      });
    });
  });

  describe('data validation utilities', () => {
    describe('isValidMovieData', () => {
      it('should return true for complete valid movie data', () => {
        const validData = {
          title: 'Test Movie',
          director: 'Test Director',
          genre: 'Action',
          releaseYear: 2020,
          rating: 8.5,
        };
        expect(isValidMovieData(validData)).toBe(true);
      });

      it('should return false for missing required fields', () => {
        expect(isValidMovieData({})).toBe(false);
        expect(isValidMovieData({ title: 'Test' })).toBe(false);
        expect(isValidMovieData({ title: 'Test', director: 'Test' })).toBe(
          false
        );
      });

      it('should return false for invalid year or rating', () => {
        const invalidYear = {
          title: 'Test',
          director: 'Test',
          genre: 'Action',
          releaseYear: 1799,
          rating: 8.5,
        };
        expect(isValidMovieData(invalidYear)).toBe(false);

        const invalidRating = {
          title: 'Test',
          director: 'Test',
          genre: 'Action',
          releaseYear: 2020,
          rating: 15,
        };
        expect(isValidMovieData(invalidRating)).toBe(false);
      });
    });

    describe('sanitizeMovieData', () => {
      it('should trim string fields and format rating', () => {
        const dirtyData = {
          title: '  Test Movie  ',
          director: '  Test Director  ',
          genre: '  Action  ',
          rating: 8.567,
        };
        const result = sanitizeMovieData(dirtyData);
        expect(result).toEqual({
          title: 'Test Movie',
          director: 'Test Director',
          genre: 'Action',
          rating: 8.6,
        });
      });

      it('should handle undefined fields', () => {
        const result = sanitizeMovieData({});
        expect(result).toEqual({});
      });
    });
  });

  describe('search utilities', () => {
    describe('highlightText', () => {
      it('should wrap query text with mark tags', () => {
        const result = highlightText('The Matrix is great', 'Matrix');
        expect(result).toBe('The <mark>Matrix</mark> is great');
      });

      it('should be case insensitive', () => {
        const result = highlightText('The Matrix is great', 'matrix');
        expect(result).toBe('The <mark>Matrix</mark> is great');
      });

      it('should return original text when query is empty', () => {
        const result = highlightText('The Matrix is great', '');
        expect(result).toBe('The Matrix is great');
      });

      it('should highlight multiple occurrences', () => {
        const result = highlightText('The Matrix Matrix', 'Matrix');
        expect(result).toBe('The <mark>Matrix</mark> <mark>Matrix</mark>');
      });
    });

    describe('createSearchIndex', () => {
      it('should create word-to-movie-id mapping', () => {
        const result = createSearchIndex(sampleMovies);
        expect(result.get('matrix')).toEqual(['1']);
        expect(result.get('christopher')).toEqual(['2', '3']);
        expect(result.get('nolan')).toEqual(['2', '3']);
      });

      it('should ignore short words', () => {
        const result = createSearchIndex(sampleMovies);
        expect(result.has('is')).toBe(false);
        expect(result.has('a')).toBe(false);
      });
    });
  });

  describe('movie comparison utilities', () => {
    describe('compareMovies', () => {
      it('should compare string fields', () => {
        const result = compareMovies(sampleMovies[0], sampleMovies[1], 'title');
        expect(result).toBeGreaterThan(0); // "The Matrix" > "Inception"
      });

      it('should compare number fields', () => {
        const result = compareMovies(
          sampleMovies[0],
          sampleMovies[1],
          'rating'
        );
        expect(result).toBeLessThan(0); // 8.7 < 8.8
      });

      it('should compare boolean fields', () => {
        const result = compareMovies(
          sampleMovies[0],
          sampleMovies[1],
          'favorite'
        );
        expect(result).toBeGreaterThan(0); // true > false
      });
    });

    describe('isDuplicateMovie', () => {
      it('should return true for duplicate movies', () => {
        const movie1 = sampleMovies[0];
        const movie2 = { ...movie1, id: 'different' };
        expect(isDuplicateMovie(movie1, movie2)).toBe(true);
      });

      it('should return false for different movies', () => {
        expect(isDuplicateMovie(sampleMovies[0], sampleMovies[1])).toBe(false);
      });

      it('should be case insensitive for title and director', () => {
        const movie1 = sampleMovies[0];
        const movie2 = {
          ...movie1,
          id: 'different',
          title: movie1.title.toUpperCase(),
          director: movie1.director.toUpperCase(),
        };
        expect(isDuplicateMovie(movie1, movie2)).toBe(true);
      });

      it('should consider year in duplicate detection', () => {
        const movie1 = sampleMovies[0];
        const movie2 = { ...movie1, id: 'different', releaseYear: 2000 };
        expect(isDuplicateMovie(movie1, movie2)).toBe(false);
      });
    });
  });
});
