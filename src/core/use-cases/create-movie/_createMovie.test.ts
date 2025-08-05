import type { Movie } from '@/core/models/movie';
import type { MovieRepository } from '@/core/models/repository';
import { describe, expect, it, vi } from 'vitest';
import { createCreateMovieUseCase } from './createMovie';

const mockMovie: Movie = {
  id: '1',
  title: 'New Movie',
  releaseYear: 2023,
  director: 'John Doe',
  rating: 8.5,
  genre: 'Action',
  favorite: false,
};

describe('CreateMovieUseCase', () => {
  it('should create movie successfully', async () => {
    const mockRepository: MovieRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn().mockResolvedValue(mockMovie),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = createCreateMovieUseCase(mockRepository);
    const movieData = {
      title: 'New Movie',
      releaseYear: 2023,
      director: 'John Doe',
      rating: 8.5,
      genre: 'Action',
      favorite: false,
    };

    const result = await useCase.execute(movieData);

    expect(result).toEqual(mockMovie);
    expect(mockRepository.create).toHaveBeenCalledWith({
      id: '',
      title: 'New Movie',
      director: 'John Doe',
      genre: 'Action',
      releaseYear: 2023,
      rating: 8.5,
      favorite: false,
    });
  });

  it('should throw error for empty title', async () => {
    const mockRepository: MovieRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = createCreateMovieUseCase(mockRepository);
    const movieData = {
      title: '',
      releaseYear: 2023,
      director: 'John Doe',
      rating: 8.5,
      genre: 'Action',
      favorite: false,
    };

    await expect(useCase.execute(movieData)).rejects.toThrow(
      'El título de la película es requerido'
    );
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw error for invalid rating', async () => {
    const mockRepository: MovieRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = createCreateMovieUseCase(mockRepository);
    const movieData = {
      title: 'New Movie',
      releaseYear: 2023,
      director: 'John Doe',
      rating: 15, // Invalid rating
      genre: 'Action',
      favorite: false,
    };

    await expect(useCase.execute(movieData)).rejects.toThrow(
      'La calificación debe estar entre 0 y 10'
    );
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw error for invalid release year', async () => {
    const mockRepository: MovieRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = createCreateMovieUseCase(mockRepository);
    const movieData = {
      title: 'New Movie',
      releaseYear: 1700, // Invalid year
      director: 'John Doe',
      rating: 8.5,
      genre: 'Action',
      favorite: false,
    };

    await expect(useCase.execute(movieData)).rejects.toThrow(
      'El año de lanzamiento debe estar entre 1800 y'
    );
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
