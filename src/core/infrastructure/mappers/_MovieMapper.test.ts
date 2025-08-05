import { Movie } from '@/core/models/movie';
import { describe, expect, it } from 'vitest';
import { ApiMovieResponse } from './ApiMovie.types';
import { toApi, toApiUpdate, toDomain, toDomainList } from './MovieMapper';

describe('MovieMapper', () => {
  describe('toDomain', () => {
    it('should transform ApiMovieResponse to Movie domain model', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'api-123',
        title: 'Inception',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
        rating: 8.8,
        favorite: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
      };

      const result = toDomain(apiMovie);

      expect(result).toEqual({
        id: 'api-123',
        title: 'Inception',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
        rating: 8.8,
        favorite: true,
      });
    });

    it('should set favorite to false when not provided in API response', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'api-456',
        title: 'The Matrix',
        releaseYear: 1999,
        genre: 'Sci-Fi',
        director: 'The Wachowskis',
        rating: 8.7,
      };

      const result = toDomain(apiMovie);

      expect(result.favorite).toBe(false);
    });

    it('should handle favorite as false explicitly', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'api-789',
        title: 'Blade Runner',
        releaseYear: 1982,
        genre: 'Sci-Fi',
        director: 'Ridley Scott',
        rating: 8.1,
        favorite: false,
      };

      const result = toDomain(apiMovie);

      expect(result.favorite).toBe(false);
    });

    it('should preserve all required movie properties', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'test-id',
        title: 'Test Movie',
        releaseYear: 2020,
        genre: 'Drama',
        director: 'Test Director',
        rating: 7.5,
        favorite: true,
      };

      const result = toDomain(apiMovie);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('releaseYear');
      expect(result).toHaveProperty('genre');
      expect(result).toHaveProperty('director');
      expect(result).toHaveProperty('rating');
      expect(result).toHaveProperty('favorite');
    });

    it('should not include API-specific properties in domain model', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'api-test',
        title: 'API Test Movie',
        releaseYear: 2023,
        genre: 'Test',
        director: 'Test Director',
        rating: 5.0,
        favorite: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
      };

      const result = toDomain(apiMovie);

      expect(result).not.toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('updatedAt');
    });
  });

  describe('toApi', () => {
    it('should transform Movie domain model to ApiMovieRequest (without id)', () => {
      const movie: Omit<Movie, 'id'> = {
        title: 'Inception',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
        rating: 8.8,
        favorite: true,
      };

      const result = toApi(movie);

      expect(result).toEqual({
        title: 'Inception',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
        rating: 8.8,
        favorite: true,
      });
    });

    it('should handle movie without favorite property', () => {
      const movie: Omit<Movie, 'id'> = {
        title: 'The Matrix',
        releaseYear: 1999,
        genre: 'Sci-Fi',
        director: 'The Wachowskis',
        rating: 8.7,
        favorite: false,
      };

      const result = toApi(movie);

      expect(result.favorite).toBe(false);
    });

    it('should not include id in API request', () => {
      const movie: Omit<Movie, 'id'> = {
        title: 'Test Movie',
        releaseYear: 2020,
        genre: 'Drama',
        director: 'Test Director',
        rating: 7.5,
        favorite: true,
      };

      const result = toApi(movie);

      expect(result).not.toHaveProperty('id');
    });

    it('should preserve all movie properties except id', () => {
      const movie: Omit<Movie, 'id'> = {
        title: 'Complete Movie',
        releaseYear: 2021,
        genre: 'Action',
        director: 'Action Director',
        rating: 9.0,
        favorite: true,
      };

      const result = toApi(movie);

      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('releaseYear');
      expect(result).toHaveProperty('genre');
      expect(result).toHaveProperty('director');
      expect(result).toHaveProperty('rating');
      expect(result).toHaveProperty('favorite');
    });
  });

  describe('toApiUpdate', () => {
    it('should transform complete Movie domain model to ApiMovieRequest', () => {
      const movie: Movie = {
        id: 'movie-123',
        title: 'Updated Inception',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
        rating: 9.0,
        favorite: false,
      };

      const result = toApiUpdate(movie);

      expect(result).toEqual({
        title: 'Updated Inception',
        releaseYear: 2010,
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
        rating: 9.0,
        favorite: false,
      });
    });

    it('should not include id in update request', () => {
      const movie: Movie = {
        id: 'should-not-be-included',
        title: 'Update Test',
        releaseYear: 2023,
        genre: 'Test',
        director: 'Test Director',
        rating: 8.0,
        favorite: true,
      };

      const result = toApiUpdate(movie);

      expect(result).not.toHaveProperty('id');
    });

    it('should handle favorite toggle correctly', () => {
      const movie: Movie = {
        id: 'toggle-test',
        title: 'Toggle Movie',
        releaseYear: 2022,
        genre: 'Comedy',
        director: 'Comedy Director',
        rating: 7.0,
        favorite: true,
      };

      const result = toApiUpdate(movie);

      expect(result.favorite).toBe(true);
    });
  });

  describe('toDomainList', () => {
    it('should transform array of ApiMovieResponse to array of Movie domain models', () => {
      const apiMovies: ApiMovieResponse[] = [
        {
          id: 'api-1',
          title: 'Movie 1',
          releaseYear: 2020,
          genre: 'Action',
          director: 'Director 1',
          rating: 8.0,
          favorite: true,
        },
        {
          id: 'api-2',
          title: 'Movie 2',
          releaseYear: 2021,
          genre: 'Drama',
          director: 'Director 2',
          rating: 7.5,
          favorite: false,
        },
      ];

      const result = toDomainList(apiMovies);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'api-1',
        title: 'Movie 1',
        releaseYear: 2020,
        genre: 'Action',
        director: 'Director 1',
        rating: 8.0,
        favorite: true,
      });
      expect(result[1]).toEqual({
        id: 'api-2',
        title: 'Movie 2',
        releaseYear: 2021,
        genre: 'Drama',
        director: 'Director 2',
        rating: 7.5,
        favorite: false,
      });
    });

    it('should handle empty array', () => {
      const apiMovies: ApiMovieResponse[] = [];

      const result = toDomainList(apiMovies);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle array with movies missing favorite property', () => {
      const apiMovies: ApiMovieResponse[] = [
        {
          id: 'api-no-fav',
          title: 'No Favorite Movie',
          releaseYear: 2019,
          genre: 'Horror',
          director: 'Horror Director',
          rating: 6.5,
        },
      ];

      const result = toDomainList(apiMovies);

      expect(result).toHaveLength(1);
      expect(result[0].favorite).toBe(false);
    });

    it('should handle large arrays efficiently', () => {
      const apiMovies: ApiMovieResponse[] = Array.from(
        { length: 100 },
        (_, i) => ({
          id: `api-${i}`,
          title: `Movie ${i}`,
          releaseYear: 2000 + i,
          genre: `Genre ${i % 5}`,
          director: `Director ${i}`,
          rating: Math.round(Math.random() * 10 * 10) / 10,
          favorite: i % 2 === 0,
        })
      );

      const result = toDomainList(apiMovies);

      expect(result).toHaveLength(100);
      expect(result[0].id).toBe('api-0');
      expect(result[99].id).toBe('api-99');
    });
  });

  describe('Integration: round-trip transformations', () => {
    it('should maintain data integrity in API -> Domain -> API transformation', () => {
      const originalApiMovie: ApiMovieResponse = {
        id: 'round-trip-test',
        title: 'Round Trip Movie',
        releaseYear: 2022,
        genre: 'Adventure',
        director: 'Adventure Director',
        rating: 8.5,
        favorite: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
      };

      // API -> Domain
      const domainMovie = toDomain(originalApiMovie);

      // Domain -> API (for update)
      const backToApi = toApiUpdate(domainMovie);

      // Verify data integrity (excluding API-specific properties)
      expect(backToApi.title).toBe(originalApiMovie.title);
      expect(backToApi.releaseYear).toBe(originalApiMovie.releaseYear);
      expect(backToApi.genre).toBe(originalApiMovie.genre);
      expect(backToApi.director).toBe(originalApiMovie.director);
      expect(backToApi.rating).toBe(originalApiMovie.rating);
      expect(backToApi.favorite).toBe(originalApiMovie.favorite);
    });

    it('should handle round-trip with missing optional properties', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'minimal-movie',
        title: 'Minimal Movie',
        releaseYear: 2020,
        genre: 'Documentary',
        director: 'Doc Director',
        rating: 7.0,
        // no favorite property
      };

      const domainMovie = toDomain(apiMovie);
      const backToApi = toApiUpdate(domainMovie);

      expect(backToApi.favorite).toBe(false);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle movies with special characters in strings', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'special-chars',
        title: 'Movie with "Quotes" & Symbols!',
        releaseYear: 2023,
        genre: 'Sci-Fi/Fantasy',
        director: "O'Connor, María José",
        rating: 8.0,
        favorite: true,
      };

      const domainMovie = toDomain(apiMovie);
      const backToApi = toApiUpdate(domainMovie);

      expect(domainMovie.title).toBe('Movie with "Quotes" & Symbols!');
      expect(domainMovie.genre).toBe('Sci-Fi/Fantasy');
      expect(domainMovie.director).toBe("O'Connor, María José");
      expect(backToApi.title).toBe(apiMovie.title);
      expect(backToApi.director).toBe(apiMovie.director);
    });

    it('should handle boundary values for rating and year', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'boundary-values',
        title: 'Boundary Movie',
        releaseYear: 1888, // First motion picture
        genre: 'Historical',
        director: 'Louis Le Prince',
        rating: 0.0,
        favorite: false,
      };

      const domainMovie = toDomain(apiMovie);

      expect(domainMovie.releaseYear).toBe(1888);
      expect(domainMovie.rating).toBe(0.0);
    });

    it('should handle maximum values', () => {
      const apiMovie: ApiMovieResponse = {
        id: 'max-values',
        title: 'Future Movie',
        releaseYear: 2050,
        genre: 'Future Sci-Fi',
        director: 'AI Director',
        rating: 10.0,
        favorite: true,
      };

      const domainMovie = toDomain(apiMovie);

      expect(domainMovie.releaseYear).toBe(2050);
      expect(domainMovie.rating).toBe(10.0);
    });
  });
});
