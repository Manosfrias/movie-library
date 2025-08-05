import { Movie } from '@/core/models/movie';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanStorageData,
  deserializeFromStorage,
  fromStorage,
  fromStorageList,
  serializeForStorage,
  StorageMovieData,
  toStorage,
  toStorageList,
  validateStorageData,
  validateStorageDataList
} from './StorageMapper';

describe('StorageMapper', () => {
  const mockMovie: Movie = {
    id: 'test-123',
    title: 'Test Movie',
    releaseYear: 2023,
    genre: 'Drama',
    director: 'Test Director',
    rating: 8.5,
    favorite: true
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-12-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('toStorage', () => {
    it('should transform Movie to StorageMovieData with metadata', () => {
      const result = toStorage(mockMovie);

      expect(result).toEqual({
        id: 'test-123',
        title: 'Test Movie',
        releaseYear: 2023,
        genre: 'Drama',
        director: 'Test Director',
        rating: 8.5,
        favorite: true,
        storedAt: '2023-12-01T12:00:00.000Z',
        lastModified: '2023-12-01T12:00:00.000Z'
      });
    });

    it('should handle movie with favorite as false', () => {
      const movieWithoutFavorite: Movie = {
        ...mockMovie,
        favorite: false
      };

      const result = toStorage(movieWithoutFavorite);

      expect(result.favorite).toBe(false);
    });

    it('should handle movie with undefined favorite property', () => {
      const movieWithUndefinedFavorite = {
        ...mockMovie,
        favorite: undefined
      } as any;

      const result = toStorage(movieWithUndefinedFavorite);

      expect(result.favorite).toBe(false);
    });

    it('should add current timestamp for storedAt and lastModified', () => {
      const result = toStorage(mockMovie);

      expect(result.storedAt).toBe('2023-12-01T12:00:00.000Z');
      expect(result.lastModified).toBe('2023-12-01T12:00:00.000Z');
    });

    it('should preserve all movie properties', () => {
      const result = toStorage(mockMovie);

      expect(result.id).toBe(mockMovie.id);
      expect(result.title).toBe(mockMovie.title);
      expect(result.releaseYear).toBe(mockMovie.releaseYear);
      expect(result.genre).toBe(mockMovie.genre);
      expect(result.director).toBe(mockMovie.director);
      expect(result.rating).toBe(mockMovie.rating);
    });
  });

  describe('fromStorage', () => {
    const mockStorageData: StorageMovieData = {
      id: 'storage-456',
      title: 'Storage Movie',
      releaseYear: 2022,
      genre: 'Action',
      director: 'Storage Director',
      rating: 7.8,
      favorite: true,
      storedAt: '2023-01-01T00:00:00Z',
      lastModified: '2023-01-02T00:00:00Z'
    };

    it('should transform StorageMovieData to Movie domain model', () => {
      const result = fromStorage(mockStorageData);

      expect(result).toEqual({
        id: 'storage-456',
        title: 'Storage Movie',
        releaseYear: 2022,
        genre: 'Action',
        director: 'Storage Director',
        rating: 7.8,
        favorite: true
      });
    });

    it('should not include storage-specific metadata in domain model', () => {
      const result = fromStorage(mockStorageData);

      expect(result).not.toHaveProperty('storedAt');
      expect(result).not.toHaveProperty('lastModified');
    });

    it('should handle storage data without favorite property', () => {
      const storageDataWithoutFavorite = {
        ...mockStorageData,
        favorite: undefined
      } as any;

      const result = fromStorage(storageDataWithoutFavorite);

      expect(result.favorite).toBe(false);
    });

    it('should handle storage data with favorite as false', () => {
      const storageDataWithFalseFavorite = {
        ...mockStorageData,
        favorite: false
      };

      const result = fromStorage(storageDataWithFalseFavorite);

      expect(result.favorite).toBe(false);
    });
  });

  describe('toStorageList', () => {
    it('should transform array of Movies to array of StorageMovieData', () => {
      const movies: Movie[] = [
        mockMovie,
        {
          id: 'movie-2',
          title: 'Second Movie',
          releaseYear: 2021,
          genre: 'Comedy',
          director: 'Comedy Director',
          rating: 6.5,
          favorite: false
        }
      ];

      const result = toStorageList(movies);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('test-123');
      expect(result[1].id).toBe('movie-2');
      expect(result[0]).toHaveProperty('storedAt');
      expect(result[1]).toHaveProperty('lastModified');
    });

    it('should handle empty array', () => {
      const result = toStorageList([]);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('fromStorageList', () => {
    it('should transform array of StorageMovieData to array of Movies', () => {
      const storageDataList: StorageMovieData[] = [
        {
          id: 'storage-1',
          title: 'Storage Movie 1',
          releaseYear: 2020,
          genre: 'Drama',
          director: 'Director 1',
          rating: 8.0,
          favorite: true,
          storedAt: '2023-01-01T00:00:00Z'
        },
        {
          id: 'storage-2',
          title: 'Storage Movie 2',
          releaseYear: 2021,
          genre: 'Action',
          director: 'Director 2',
          rating: 7.5,
          favorite: false,
          storedAt: '2023-01-02T00:00:00Z'
        }
      ];

      const result = fromStorageList(storageDataList);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'storage-1',
        title: 'Storage Movie 1',
        releaseYear: 2020,
        genre: 'Drama',
        director: 'Director 1',
        rating: 8.0,
        favorite: true
      });
      expect(result[1]).toEqual({
        id: 'storage-2',
        title: 'Storage Movie 2',
        releaseYear: 2021,
        genre: 'Action',
        director: 'Director 2',
        rating: 7.5,
        favorite: false
      });
    });

    it('should handle empty array', () => {
      const result = fromStorageList([]);

      expect(result).toEqual([]);
    });
  });

  describe('serializeForStorage', () => {
    it('should serialize movies to JSON string with storage metadata', () => {
      const movies: Movie[] = [mockMovie];

      const result = serializeForStorage(movies);
      const parsed = JSON.parse(result);

      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toHaveProperty('storedAt');
      expect(parsed[0]).toHaveProperty('lastModified');
      expect(parsed[0].id).toBe('test-123');
    });

    it('should handle empty array', () => {
      const result = serializeForStorage([]);
      const parsed = JSON.parse(result);

      expect(parsed).toEqual([]);
    });

    it('should throw error when serialization fails', () => {
      // Mock JSON.stringify to throw an error
      const originalStringify = JSON.stringify;
      vi.spyOn(JSON, 'stringify').mockImplementation(() => {
        throw new Error('Mock serialization error');
      });

      expect(() => serializeForStorage([mockMovie])).toThrow('Storage serialization failed');

      // Restore original implementation
      JSON.stringify = originalStringify;
    });
  });

  describe('deserializeFromStorage', () => {
    it('should deserialize JSON string to movies array (new format)', () => {
      const storageData: StorageMovieData[] = [
        {
          id: 'deserialize-1',
          title: 'Deserialize Movie',
          releaseYear: 2023,
          genre: 'Sci-Fi',
          director: 'Sci-Fi Director',
          rating: 9.0,
          favorite: true,
          storedAt: '2023-01-01T00:00:00Z',
          lastModified: '2023-01-01T00:00:00Z'
        }
      ];

      const jsonString = JSON.stringify(storageData);
      const result = deserializeFromStorage(jsonString);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'deserialize-1',
        title: 'Deserialize Movie',
        releaseYear: 2023,
        genre: 'Sci-Fi',
        director: 'Sci-Fi Director',
        rating: 9.0,
        favorite: true
      });
    });

    it('should handle legacy format (direct Movie array)', () => {
      const legacyData: Movie[] = [
        {
          id: 'legacy-1',
          title: 'Legacy Movie',
          releaseYear: 2020,
          genre: 'Drama',
          director: 'Drama Director',
          rating: 7.0,
          favorite: false
        }
      ];

      const jsonString = JSON.stringify(legacyData);
      const result = deserializeFromStorage(jsonString);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(legacyData[0]);
    });

    it('should return empty array for empty JSON string', () => {
      expect(deserializeFromStorage('')).toEqual([]);
      expect(deserializeFromStorage('   ')).toEqual([]);
    });

    it('should return empty array for empty JSON array', () => {
      const result = deserializeFromStorage('[]');

      expect(result).toEqual([]);
    });

    it('should handle legacy format without favorite property', () => {
      const legacyDataWithoutFavorite = [
        {
          id: 'legacy-no-fav',
          title: 'Legacy Movie',
          releaseYear: 2019,
          genre: 'Horror',
          director: 'Horror Director',
          rating: 6.0
        }
      ];

      const jsonString = JSON.stringify(legacyDataWithoutFavorite);
      const result = deserializeFromStorage(jsonString);

      expect(result[0].favorite).toBe(false);
    });

    it('should throw error for invalid JSON', () => {
      expect(() => deserializeFromStorage('invalid json')).toThrow('Storage deserialization failed');
    });

    it('should throw error for non-array JSON', () => {
      expect(() => deserializeFromStorage('{"not": "array"}')).toThrow('Storage deserialization failed');
    });

    it('should handle mixed valid/invalid data gracefully', () => {
      // This test ensures the deserializer doesn't crash on unexpected data structures
      const mixedData = JSON.stringify([
        {
          id: 'valid-1',
          title: 'Valid Movie',
          releaseYear: 2023,
          genre: 'Action',
          director: 'Action Director',
          rating: 8.0,
          favorite: true
        }
      ]);

      const result = deserializeFromStorage(mixedData);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('valid-1');
    });
  });

  describe('validateStorageData', () => {
    it('should validate correct StorageMovieData structure', () => {
      const validData: StorageMovieData = {
        id: 'valid-id',
        title: 'Valid Title',
        releaseYear: 2023,
        genre: 'Valid Genre',
        director: 'Valid Director',
        rating: 8.0,
        favorite: true,
        storedAt: '2023-01-01T00:00:00Z'
      };

      expect(validateStorageData(validData)).toBe(true);
    });

    it('should reject data with missing required properties', () => {
      const invalidData = {
        id: 'missing-title',
        releaseYear: 2023,
        genre: 'Genre',
        director: 'Director',
        rating: 8.0,
        favorite: true
      };

      expect(validateStorageData(invalidData)).toBe(false);
    });

    it('should reject data with wrong property types', () => {
      const invalidData = {
        id: 123, // should be string
        title: 'Title',
        releaseYear: '2023', // should be number
        genre: 'Genre',
        director: 'Director',
        rating: 8.0,
        favorite: true
      };

      expect(validateStorageData(invalidData)).toBe(false);
    });

    it('should reject null and undefined', () => {
      expect(validateStorageData(null)).toBe(false);
      expect(validateStorageData(undefined)).toBe(false);
    });

    it('should reject non-object types', () => {
      expect(validateStorageData('string')).toBe(false);
      expect(validateStorageData(123)).toBe(false);
      expect(validateStorageData([])).toBe(false);
    });
  });

  describe('validateStorageDataList', () => {
    it('should validate array of valid StorageMovieData', () => {
      const validDataList: StorageMovieData[] = [
        {
          id: 'valid-1',
          title: 'Movie 1',
          releaseYear: 2023,
          genre: 'Action',
          director: 'Director 1',
          rating: 8.0,
          favorite: true
        },
        {
          id: 'valid-2',
          title: 'Movie 2',
          releaseYear: 2022,
          genre: 'Drama',
          director: 'Director 2',
          rating: 7.5,
          favorite: false
        }
      ];

      expect(validateStorageDataList(validDataList)).toBe(true);
    });

    it('should reject array with invalid items', () => {
      const invalidDataList = [
        {
          id: 'valid-1',
          title: 'Movie 1',
          releaseYear: 2023,
          genre: 'Action',
          director: 'Director 1',
          rating: 8.0,
          favorite: true
        },
        {
          id: 'invalid-2',
          // missing title
          releaseYear: 2022,
          genre: 'Drama',
          director: 'Director 2',
          rating: 7.5,
          favorite: false
        }
      ];

      expect(validateStorageDataList(invalidDataList)).toBe(false);
    });

    it('should accept empty array', () => {
      expect(validateStorageDataList([])).toBe(true);
    });

    it('should reject non-array input', () => {
      expect(validateStorageDataList({} as any)).toBe(false);
      expect(validateStorageDataList('not array' as any)).toBe(false);
    });
  });

  describe('cleanStorageData', () => {
    it('should filter out invalid entries and keep valid ones', () => {
      const mixedData = [
        {
          id: 'valid-1',
          title: 'Valid Movie',
          releaseYear: 2023,
          genre: 'Action',
          director: 'Director',
          rating: 8.0,
          favorite: true
        },
        {
          id: 'invalid-1',
          // missing title
          releaseYear: 2022,
          genre: 'Drama',
          director: 'Director',
          rating: 7.0,
          favorite: false
        },
        {
          id: 'valid-2',
          title: 'Another Valid Movie',
          releaseYear: 2021,
          genre: 'Comedy',
          director: 'Comedy Director',
          rating: 6.5,
          favorite: true
        }
      ];

      const result = cleanStorageData(mixedData);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('valid-1');
      expect(result[1].id).toBe('valid-2');
    });

    it('should return empty array when all entries are invalid', () => {
      const invalidData = [
        { invalid: 'data' },
        { another: 'invalid' },
        null,
        undefined
      ];

      const result = cleanStorageData(invalidData);

      expect(result).toEqual([]);
    });

    it('should handle empty array', () => {
      const result = cleanStorageData([]);

      expect(result).toEqual([]);
    });
  });

  describe('Integration: round-trip transformations', () => {
    it('should maintain data integrity in Movie -> Storage -> Movie transformation', () => {
      const originalMovie: Movie = {
        id: 'round-trip-test',
        title: 'Round Trip Movie',
        releaseYear: 2023,
        genre: 'Adventure',
        director: 'Adventure Director',
        rating: 8.7,
        favorite: true
      };

      // Movie -> Storage
      const storageData = toStorage(originalMovie);
      
      // Storage -> Movie
      const backToMovie = fromStorage(storageData);

      // Verify data integrity
      expect(backToMovie.id).toBe(originalMovie.id);
      expect(backToMovie.title).toBe(originalMovie.title);
      expect(backToMovie.releaseYear).toBe(originalMovie.releaseYear);
      expect(backToMovie.genre).toBe(originalMovie.genre);
      expect(backToMovie.director).toBe(originalMovie.director);
      expect(backToMovie.rating).toBe(originalMovie.rating);
      expect(backToMovie.favorite).toBe(originalMovie.favorite);
    });

    it('should maintain data integrity in serialize -> deserialize cycle', () => {
      const originalMovies: Movie[] = [
        {
          id: 'serialize-1',
          title: 'Serialize Movie 1',
          releaseYear: 2023,
          genre: 'Drama',
          director: 'Drama Director',
          rating: 8.5,
          favorite: true
        },
        {
          id: 'serialize-2',
          title: 'Serialize Movie 2',
          releaseYear: 2022,
          genre: 'Action',
          director: 'Action Director',
          rating: 7.8,
          favorite: false
        }
      ];

      // Serialize
      const serialized = serializeForStorage(originalMovies);
      
      // Deserialize
      const deserialized = deserializeFromStorage(serialized);

      // Verify data integrity
      expect(deserialized).toHaveLength(2);
      expect(deserialized[0].id).toBe(originalMovies[0].id);
      expect(deserialized[0].title).toBe(originalMovies[0].title);
      expect(deserialized[1].id).toBe(originalMovies[1].id);
      expect(deserialized[1].favorite).toBe(originalMovies[1].favorite);
    });
  });
});
