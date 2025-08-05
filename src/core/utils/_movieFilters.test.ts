import type { Movie } from '@/core/models/movie';
import { describe, expect, it } from 'vitest';
import {
  applyAllFilters,
  filterByFavorites,
  filterByGenre,
  filterBySearch,
  getRatingRange,
  getUniqueGenres,
  getYearRange,
  sortMovies,
  type FilterCriteria
} from './movieFilters';

describe('movieFilters', () => {
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
    {
      id: '4',
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      genre: 'Crime',
      releaseYear: 1994,
      rating: 8.9,
      favorite: false,
    },
  ];

  describe('filterByFavorites', () => {
    it('should return all movies when showOnlyFavorites is false', () => {
      const result = filterByFavorites(sampleMovies, false);
      expect(result).toEqual(sampleMovies);
      expect(result).toHaveLength(4);
    });

    it('should return only favorite movies when showOnlyFavorites is true', () => {
      const result = filterByFavorites(sampleMovies, true);
      expect(result).toHaveLength(2);
      expect(result.every(movie => movie.favorite)).toBe(true);
      expect(result.map(m => m.title)).toEqual(['The Matrix', 'The Dark Knight']);
    });

    it('should return empty array when no favorites and showOnlyFavorites is true', () => {
      const moviesWithoutFavorites = sampleMovies.map(m => ({ ...m, favorite: false }));
      const result = filterByFavorites(moviesWithoutFavorites, true);
      expect(result).toEqual([]);
    });

    it('should handle empty array', () => {
      const result = filterByFavorites([], true);
      expect(result).toEqual([]);
    });
  });

  describe('filterBySearch', () => {
    it('should return all movies when search query is empty', () => {
      const result = filterBySearch(sampleMovies, '', 'byTitle');
      expect(result).toEqual(sampleMovies);
    });

    it('should return all movies when search query is only whitespace', () => {
      const result = filterBySearch(sampleMovies, '   ', 'byTitle');
      expect(result).toEqual(sampleMovies);
    });

    it('should filter by title correctly', () => {
      const result = filterBySearch(sampleMovies, 'matrix', 'byTitle');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Matrix');
    });

    it('should filter by title case-insensitively', () => {
      const result = filterBySearch(sampleMovies, 'MATRIX', 'byTitle');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Matrix');
    });

    it('should filter by director correctly', () => {
      const result = filterBySearch(sampleMovies, 'nolan', 'byDirector');
      expect(result).toHaveLength(2);
      expect(result.map(m => m.title)).toEqual(['Inception', 'The Dark Knight']);
    });

    it('should filter by release year correctly', () => {
      const result = filterBySearch(sampleMovies, '2010', 'byReleaseDate');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Inception');
    });

    it('should filter by rating correctly', () => {
      const result = filterBySearch(sampleMovies, '8.8', 'byRating');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Inception');
    });

    it('should filter by default criteria (title or director)', () => {
      const result = filterBySearch(sampleMovies, 'nolan', 'all');
      expect(result).toHaveLength(2);
      expect(result.map(m => m.title)).toEqual(['Inception', 'The Dark Knight']);
    });

    it('should search in title when using default criteria', () => {
      const result = filterBySearch(sampleMovies, 'matrix', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Matrix');
    });

    it('should return empty array when no matches found', () => {
      const result = filterBySearch(sampleMovies, 'nonexistent', 'byTitle');
      expect(result).toEqual([]);
    });

    it('should handle partial matches', () => {
      const result = filterBySearch(sampleMovies, 'dark', 'byTitle');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Dark Knight');
    });
  });

  describe('filterByGenre', () => {
    it('should return all movies when genre is "Todos los Géneros"', () => {
      const result = filterByGenre(sampleMovies, 'Todos los Géneros');
      expect(result).toEqual(sampleMovies);
    });

    it('should return all movies when genre is empty', () => {
      const result = filterByGenre(sampleMovies, '');
      expect(result).toEqual(sampleMovies);
    });

    it('should filter by specific genre correctly', () => {
      const result = filterByGenre(sampleMovies, 'Sci-Fi');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Matrix');
    });

    it('should return empty array when genre not found', () => {
      const result = filterByGenre(sampleMovies, 'Horror');
      expect(result).toEqual([]);
    });

    it('should handle case-sensitive genre matching', () => {
      const result = filterByGenre(sampleMovies, 'sci-fi');
      expect(result).toEqual([]);
    });
  });

  describe('sortMovies', () => {
    it('should return movies unchanged when sortBy is empty', () => {
      const result = sortMovies(sampleMovies, '');
      expect(result).toEqual(sampleMovies);
    });

    it('should sort by title alphabetically', () => {
      const result = sortMovies(sampleMovies, 'Por Título');
      const titles = result.map(m => m.title);
      expect(titles).toEqual(['Inception', 'Pulp Fiction', 'The Dark Knight', 'The Matrix']);
    });

    it('should sort by director alphabetically', () => {
      const result = sortMovies(sampleMovies, 'Por Director');
      const directors = result.map(m => m.director);
      expect(directors).toEqual([
        'Christopher Nolan',
        'Christopher Nolan', 
        'Quentin Tarantino',
        'The Wachowskis'
      ]);
    });

    it('should sort by release year (newest first)', () => {
      const result = sortMovies(sampleMovies, 'Por Fecha de Estreno');
      const years = result.map(m => m.releaseYear);
      expect(years).toEqual([2010, 2008, 1999, 1994]);
    });

    it('should sort by rating (highest first)', () => {
      const result = sortMovies(sampleMovies, 'Por Calificación');
      const ratings = result.map(m => m.rating);
      expect(ratings).toEqual([9.0, 8.9, 8.8, 8.7]);
    });

    it('should return unchanged array for unknown sort criteria', () => {
      const result = sortMovies(sampleMovies, 'Unknown Criteria');
      expect(result).toEqual(sampleMovies);
    });

    it('should not modify original array', () => {
      const originalMovies = [...sampleMovies];
      sortMovies(sampleMovies, 'Por Título');
      expect(sampleMovies).toEqual(originalMovies);
    });
  });

  describe('applyAllFilters', () => {
    const filterCriteria: FilterCriteria = {
      showOnlyFavorites: false,
      searchQuery: '',
      searchCriteria: 'all',
      selectedGenre: '',
      sortBy: '',
    };

    it('should apply no filters with default criteria', () => {
      const result = applyAllFilters(sampleMovies, filterCriteria);
      expect(result).toEqual(sampleMovies);
    });

    it('should apply favorites filter only', () => {
      const criteria = { ...filterCriteria, showOnlyFavorites: true };
      const result = applyAllFilters(sampleMovies, criteria);
      expect(result).toHaveLength(2);
      expect(result.every(movie => movie.favorite)).toBe(true);
    });

    it('should apply search filter only', () => {
      const criteria = { ...filterCriteria, searchQuery: 'nolan', searchCriteria: 'byDirector' as const };
      const result = applyAllFilters(sampleMovies, criteria);
      expect(result).toHaveLength(2);
      expect(result.every(movie => movie.director === 'Christopher Nolan')).toBe(true);
    });

    it('should apply genre filter only', () => {
      const criteria = { ...filterCriteria, selectedGenre: 'Action' };
      const result = applyAllFilters(sampleMovies, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].genre).toBe('Action');
    });

    it('should apply sort only', () => {
      const criteria = { ...filterCriteria, sortBy: 'Por Título' as const };
      const result = applyAllFilters(sampleMovies, criteria);
      expect(result.map(m => m.title)).toEqual(['Inception', 'Pulp Fiction', 'The Dark Knight', 'The Matrix']);
    });

    it('should apply multiple filters in combination', () => {
      const criteria: FilterCriteria = {
        showOnlyFavorites: true,
        searchQuery: 'the',
        searchCriteria: 'byTitle',
        selectedGenre: '',
        sortBy: 'Por Calificación',
      };
      const result = applyAllFilters(sampleMovies, criteria);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('The Dark Knight'); // Higher rating first
      expect(result[1].title).toBe('The Matrix');
      expect(result.every(movie => movie.favorite)).toBe(true);
    });

    it('should return empty array when filters exclude all movies', () => {
      const criteria = { ...filterCriteria, selectedGenre: 'Horror' };
      const result = applyAllFilters(sampleMovies, criteria);
      expect(result).toEqual([]);
    });
  });

  describe('getUniqueGenres', () => {
    it('should return unique genres sorted alphabetically', () => {
      const result = getUniqueGenres(sampleMovies);
      expect(result).toEqual(['Action', 'Crime', 'Sci-Fi', 'Thriller']);
    });

    it('should handle empty array', () => {
      const result = getUniqueGenres([]);
      expect(result).toEqual([]);
    });

    it('should handle movies with duplicate genres', () => {
      const moviesWithDuplicates = [
        ...sampleMovies,
        { ...sampleMovies[0], id: '5', title: 'Another Sci-Fi' }
      ];
      const result = getUniqueGenres(moviesWithDuplicates);
      expect(result).toEqual(['Action', 'Crime', 'Sci-Fi', 'Thriller']);
    });
  });

  describe('getYearRange', () => {
    it('should return correct year range', () => {
      const result = getYearRange(sampleMovies);
      expect(result).toEqual({ min: 1994, max: 2010 });
    });

    it('should handle empty array', () => {
      const currentYear = new Date().getFullYear();
      const result = getYearRange([]);
      expect(result).toEqual({ min: currentYear, max: currentYear });
    });

    it('should handle single movie', () => {
      const result = getYearRange([sampleMovies[0]]);
      expect(result).toEqual({ min: 1999, max: 1999 });
    });
  });

  describe('getRatingRange', () => {
    it('should return correct rating range', () => {
      const result = getRatingRange(sampleMovies);
      expect(result).toEqual({ min: 8.7, max: 9.0 });
    });

    it('should handle empty array', () => {
      const result = getRatingRange([]);
      expect(result).toEqual({ min: 0, max: 10 });
    });

    it('should handle single movie', () => {
      const result = getRatingRange([sampleMovies[0]]);
      expect(result).toEqual({ min: 8.7, max: 8.7 });
    });
  });
});
