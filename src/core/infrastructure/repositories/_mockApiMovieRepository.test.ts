import type {
  HttpClient,
  HttpResponse,
} from '@/core/infrastructure/http/HttpClient.types';
import type { ApiMovieRequest, ApiMovieResponse } from '@/core/models/apiMovie';
import type { Movie } from '@/core/models/movie';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockApiMovieRepository } from './mockApiMovieRepository';

describe('MockApiMovieRepository', () => {
  let mockHttpClient: HttpClient;
  let repository: ReturnType<typeof createMockApiMovieRepository>;

  const mockMovie: Movie = {
    id: 'test-123',
    title: 'Test Movie',
    releaseYear: 2023,
    genre: 'Drama',
    director: 'Test Director',
    rating: 8.5,
    favorite: false,
  };

  const mockApiMovie: ApiMovieResponse = {
    id: 'test-123',
    title: 'Test Movie',
    releaseYear: 2023,
    genre: 'Drama',
    director: 'Test Director',
    rating: 8.5,
    favorite: false,
  };

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    repository = createMockApiMovieRepository(mockHttpClient);
  });

  describe('findAll', () => {
    it('should fetch and return all movies', async () => {
      const mockApiMovies = [mockApiMovie, { ...mockApiMovie, id: 'test-456' }];
      const mockResponse: HttpResponse<ApiMovieResponse[]> = {
        data: mockApiMovies,
        status: 200,
        statusText: 'OK',
        headers: {},
      };

      mockHttpClient.get = vi.fn().mockResolvedValue(mockResponse);

      const movies = await repository.findAll();

      expect(mockHttpClient.get).toHaveBeenCalledWith('');
      expect(movies).toHaveLength(2);
      expect(movies[0]).toEqual(mockMovie);
      expect(movies[1]).toEqual({ ...mockMovie, id: 'test-456' });
    });

    it('should throw error when HTTP request fails', async () => {
      const mockError = new Error('Network error');
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError);

      await expect(repository.findAll()).rejects.toThrow(
        'Failed to fetch movies: Error: Network error'
      );
    });
  });

  describe('findById', () => {
    it('should fetch and return movie by ID', async () => {
      const mockResponse: HttpResponse<ApiMovieResponse> = {
        data: mockApiMovie,
        status: 200,
        statusText: 'OK',
        headers: {},
      };

      mockHttpClient.get = vi.fn().mockResolvedValue(mockResponse);

      const movie = await repository.findById('test-123');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/test-123');
      expect(movie).toEqual(mockMovie);
    });

    it('should return null when movie not found (404)', async () => {
      const mockError = { status: 404 };
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError);

      const movie = await repository.findById('nonexistent');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/nonexistent');
      expect(movie).toBeNull();
    });

    it('should throw error for non-404 HTTP errors', async () => {
      const mockError = { status: 500, message: 'Server error' };
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError);

      await expect(repository.findById('test-123')).rejects.toThrow(
        'Failed to fetch movie with id test-123:'
      );
    });
  });

  describe('create', () => {
    it('should create and return new movie', async () => {
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const expectedApiPayload: ApiMovieRequest = {
        title: 'Test Movie',
        releaseYear: 2023,
        genre: 'Drama',
        director: 'Test Director',
        rating: 8.5,
        favorite: false,
      };

      const mockResponse: HttpResponse<ApiMovieResponse> = {
        data: mockApiMovie,
        status: 201,
        statusText: 'Created',
        headers: {},
      };

      mockHttpClient.post = vi.fn().mockResolvedValue(mockResponse);

      const createdMovie = await repository.create(newMovieData);

      expect(mockHttpClient.post).toHaveBeenCalledWith('', expectedApiPayload);
      expect(createdMovie).toEqual(mockMovie);
    });

    it('should throw error when creation fails', async () => {
      const newMovieData = {
        title: mockMovie.title,
        releaseYear: mockMovie.releaseYear,
        genre: mockMovie.genre,
        director: mockMovie.director,
        rating: mockMovie.rating,
        favorite: mockMovie.favorite,
      };

      const mockError = new Error('Creation failed');
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError);

      await expect(repository.create(newMovieData)).rejects.toThrow(
        'Failed to create movie: Error: Creation failed'
      );
    });
  });

  describe('update', () => {
    it('should update and return movie', async () => {
      const updatedMovie = {
        ...mockMovie,
        title: 'Updated Title',
        favorite: true,
      };
      const updatedApiMovie = {
        ...mockApiMovie,
        title: 'Updated Title',
        favorite: true,
      };

      const expectedApiPayload: ApiMovieRequest = {
        title: 'Updated Title',
        releaseYear: 2023,
        genre: 'Drama',
        director: 'Test Director',
        rating: 8.5,
        favorite: true,
      };

      const mockResponse: HttpResponse<ApiMovieResponse> = {
        data: updatedApiMovie,
        status: 200,
        statusText: 'OK',
        headers: {},
      };

      mockHttpClient.put = vi.fn().mockResolvedValue(mockResponse);

      const result = await repository.update('test-123', updatedMovie);

      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/test-123',
        expectedApiPayload
      );
      expect(result).toEqual(updatedMovie);
    });

    it('should return null when movie not found (404)', async () => {
      const mockError = { status: 404 };
      mockHttpClient.put = vi.fn().mockRejectedValue(mockError);

      const result = await repository.update('nonexistent', mockMovie);

      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/nonexistent',
        expect.any(Object)
      );
      expect(result).toBeNull();
    });

    it('should throw error for non-404 HTTP errors', async () => {
      const mockError = { status: 500, message: 'Server error' };
      mockHttpClient.put = vi.fn().mockRejectedValue(mockError);

      await expect(repository.update('test-123', mockMovie)).rejects.toThrow(
        'Failed to update movie with id test-123:'
      );
    });
  });

  describe('delete', () => {
    it('should delete movie and return true', async () => {
      const mockResponse: HttpResponse<void> = {
        data: undefined,
        status: 204,
        statusText: 'No Content',
        headers: {},
      };

      mockHttpClient.delete = vi.fn().mockResolvedValue(mockResponse);

      const result = await repository.delete('test-123');

      expect(mockHttpClient.delete).toHaveBeenCalledWith('/test-123');
      expect(result).toBe(true);
    });

    it('should return false when movie not found (404)', async () => {
      const mockError = { status: 404 };
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError);

      const result = await repository.delete('nonexistent');

      expect(mockHttpClient.delete).toHaveBeenCalledWith('/nonexistent');
      expect(result).toBe(false);
    });

    it('should throw error for non-404 HTTP errors', async () => {
      const mockError = { status: 500, message: 'Server error' };
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError);

      await expect(repository.delete('test-123')).rejects.toThrow(
        'Failed to delete movie with id test-123:'
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle empty string ID gracefully', async () => {
      const mockError = { status: 404 };
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError);

      const movie = await repository.findById('');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/');
      expect(movie).toBeNull();
    });

    it('should handle undefined error status gracefully', async () => {
      const mockError = new Error('Unknown error');
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError);

      await expect(repository.findById('test-123')).rejects.toThrow(
        'Failed to fetch movie with id test-123: Error: Unknown error'
      );
    });

    it('should properly map domain movie to API format', async () => {
      const complexMovie = {
        title: 'Complex Movie',
        releaseYear: 2023,
        genre: 'Sci-Fi',
        director: 'Director Name',
        rating: 9.5,
        favorite: true,
      };

      const expectedApiPayload: ApiMovieRequest = {
        title: 'Complex Movie',
        releaseYear: 2023,
        genre: 'Sci-Fi',
        director: 'Director Name',
        rating: 9.5,
        favorite: true,
      };

      const mockApiResponse: ApiMovieResponse = {
        id: 'new-id',
        ...expectedApiPayload,
      };

      const mockResponse: HttpResponse<ApiMovieResponse> = {
        data: mockApiResponse,
        status: 201,
        statusText: 'Created',
        headers: {},
      };

      mockHttpClient.post = vi.fn().mockResolvedValue(mockResponse);

      await repository.create(complexMovie);

      expect(mockHttpClient.post).toHaveBeenCalledWith('', expectedApiPayload);
    });

    it('should handle API response with different status codes', async () => {
      const mockResponse: HttpResponse<ApiMovieResponse[]> = {
        data: [mockApiMovie],
        status: 206, // Partial Content
        statusText: 'Partial Content',
        headers: {},
      };

      mockHttpClient.get = vi.fn().mockResolvedValue(mockResponse);

      const movies = await repository.findAll();

      expect(movies).toHaveLength(1);
      expect(movies[0]).toEqual(mockMovie);
    });

    it('should handle multiple concurrent requests', async () => {
      const mockResponse1: HttpResponse<ApiMovieResponse> = {
        data: mockApiMovie,
        status: 200,
        statusText: 'OK',
        headers: {},
      };

      const mockResponse2: HttpResponse<ApiMovieResponse> = {
        data: { ...mockApiMovie, id: 'test-456' },
        status: 200,
        statusText: 'OK',
        headers: {},
      };

      mockHttpClient.get = vi
        .fn()
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const [movie1, movie2] = await Promise.all([
        repository.findById('test-123'),
        repository.findById('test-456'),
      ]);

      expect(movie1).toEqual(mockMovie);
      expect(movie2).toEqual({ ...mockMovie, id: 'test-456' });
      expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
    });
  });
});
