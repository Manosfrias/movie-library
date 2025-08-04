import type { Movie } from '@/core/models/movie';
import {
    validateMovieDirector,
    validateMovieGenre,
    validateMovieRating,
    validateMovieReleaseYear,
    validateMovieTitle
} from '@/core/models/movieValidation';
import type { MovieRepository } from '@/core/models/repository';
import type { UpdateMovieUseCase } from '@/core/models/useCases';

export const createUpdateMovieUseCase = (
  movieRepository: MovieRepository
): UpdateMovieUseCase => ({
  execute: async (id: string, movieData: Partial<Omit<Movie, 'id'>>): Promise<Movie | null> => {
    if (!id || id.trim() === '') {
      throw new Error('Movie ID is required');
    }

    // Verificar que la película existe
    const existingMovie = await movieRepository.findById(id);
    if (!existingMovie) {
      throw new Error(`Movie with ID ${id} not found`);
    }

    // Validaciones de negocio para los campos que se están actualizando
    if (movieData.title !== undefined) {
      validateMovieTitle(movieData.title);
    }

    if (movieData.director !== undefined) {
      validateMovieDirector(movieData.director);
    }

    if (movieData.genre !== undefined) {
      validateMovieGenre(movieData.genre);
    }

    if (movieData.releaseYear !== undefined) {
      validateMovieReleaseYear(movieData.releaseYear);
    }

    if (movieData.rating !== undefined) {
      validateMovieRating(movieData.rating);
    }

    // Crear el objeto actualizado combinando datos existentes con nuevos datos
    const updatedMovie: Movie = {
      ...existingMovie,
      ...movieData,
      id, // Mantener el ID original
      // Limpiar strings si se proporcionan
      title: movieData.title ? movieData.title.trim() : existingMovie.title,
      director: movieData.director ? movieData.director.trim() : existingMovie.director,
      genre: movieData.genre ? movieData.genre.trim() : existingMovie.genre,
    };

    try {
      return await movieRepository.update(id, updatedMovie);
    } catch (error) {
      console.error('Error updating movie:', error);
      throw new Error(`Failed to update movie with ID: ${id}`);
    }
  },
});
