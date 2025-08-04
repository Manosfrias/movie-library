import type { Movie } from '@/core/models/movie';
import { sanitizeMovieData, validateMovieData } from '@/core/models/movieValidation';
import type { MovieRepository } from '@/core/models/repository';
import type { CreateMovieUseCase } from '@/core/models/useCases';

export const createCreateMovieUseCase = (
  movieRepository: MovieRepository
): CreateMovieUseCase => ({
  execute: async (movieData: Omit<Movie, 'id'>): Promise<Movie> => {
    // Validar datos de entrada
    validateMovieData(movieData);
    
    // Limpiar y sanitizar datos
    const sanitizedData = sanitizeMovieData(movieData);

    // Crear el objeto Movie completo con un ID temporal
    // El repository se encargará de asignar el ID final
    const movieToCreate: Movie = {
      id: '', // El repository asignará el ID
      ...sanitizedData,
    };

    try {
      return await movieRepository.create(movieToCreate);
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new Error('Failed to create movie');
    }
  },
});
