import { describe, it, expect } from 'vitest';
import { Movie } from '../../core/models/movie';
import {
  filterByFavorites,
  filterBySearch,
  filterByGenre,
  sortMovies,
  applyAllFilters,
} from './movieFilters';

const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    director: 'Christopher Nolan',
    releaseYear: 2010,
    genre: 'Sci-Fi',
    rating: 8.8,
    favorite: true,
  },
  {
    id: '2',
    title: 'The Matrix',
    director: 'The Wachowskis',
    releaseYear: 1999,
    genre: 'Action',
    rating: 8.7,
    favorite: false,
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    releaseYear: 1994,
    genre: 'Crime',
    rating: 8.9,
    favorite: true,
  },
];

describe('movieFilters', () => {
  describe('filterByFavorites', () => {
    it('should return only favorite movies when showOnlyFavorites is true', () => {
      const result = filterByFavorites(mockMovies, true);
      expect(result).toHaveLength(2);
      expect(result.every((movie) => movie.favorite)).toBe(true);
    });

    it('should return all movies when showOnlyFavorites is false', () => {
      const result = filterByFavorites(mockMovies, false);
      expect(result).toEqual(mockMovies);
    });
  });

  describe('filterBySearch', () => {
    it('should filter by title', () => {
      const result = filterBySearch(mockMovies, 'inception', 'byTitle');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Inception');
    });

    it('should filter by director', () => {
      const result = filterBySearch(mockMovies, 'nolan', 'byDirector');
      expect(result).toHaveLength(1);
      expect(result[0].director).toBe('Christopher Nolan');
    });

    it('should return all movies when search query is empty', () => {
      const result = filterBySearch(mockMovies, '', 'byTitle');
      expect(result).toEqual(mockMovies);
    });
  });

  describe('filterByGenre', () => {
    it('should filter by specific genre', () => {
      const result = filterByGenre(mockMovies, 'Sci-Fi');
      expect(result).toHaveLength(1);
      expect(result[0].genre).toBe('Sci-Fi');
    });

    it('should return all movies when genre is "Todos los Géneros"', () => {
      const result = filterByGenre(mockMovies, 'Todos los Géneros');
      expect(result).toEqual(mockMovies);
    });
  });

  describe('sortMovies', () => {
    it('should sort by title', () => {
      const result = sortMovies(mockMovies, 'Por Título');
      expect(result[0].title).toBe('Inception');
      expect(result[1].title).toBe('Pulp Fiction');
      expect(result[2].title).toBe('The Matrix');
    });

    it('should sort by rating descending', () => {
      const result = sortMovies(mockMovies, 'Por Calificación');
      expect(result[0].rating).toBe(8.9);
      expect(result[1].rating).toBe(8.8);
      expect(result[2].rating).toBe(8.7);
    });
  });

  describe('applyAllFilters', () => {
    it('should apply all filters correctly', () => {
      const result = applyAllFilters(
        mockMovies,
        true, // only favorites
        'pulp', // search query
        'byTitle', // search criteria
        'Crime', // genre
        'Por Calificación' // sort by rating
      );
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Pulp Fiction');
    });
  });
});
