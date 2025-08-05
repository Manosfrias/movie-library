import { HttpClient } from '@/core/infrastructure/http/HttpClient.types';
import {
  toApi,
  toApiUpdate,
  toDomain,
  toDomainList,
} from '@/core/infrastructure/mappers/movieMapper';
import { ApiMovieResponse } from '@/core/models/apiMovie';
import { Movie } from '@/core/models/movie';
import { MovieRepository } from '@/core/models/repository';

export const createMockApiMovieRepository = (
  httpClient: HttpClient
): MovieRepository => ({
  async findAll(): Promise<Movie[]> {
    try {
      const response = await httpClient.get<ApiMovieResponse[]>('');
      return toDomainList(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error}`);
    }
  },

  async findById(id: string): Promise<Movie | null> {
    try {
      const response = await httpClient.get<ApiMovieResponse>(`/${id}`);
      return toDomain(response.data);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch movie with id ${id}: ${error}`);
    }
  },

  async create(movie: Omit<Movie, 'id'>): Promise<Movie> {
    try {
      const apiMovie = toApi(movie);
      const response = await httpClient.post<ApiMovieResponse>('', apiMovie);
      return toDomain(response.data);
    } catch (error) {
      throw new Error(`Failed to create movie: ${error}`);
    }
  },

  async update(id: string, movie: Movie): Promise<Movie | null> {
    try {
      const apiMovie = toApiUpdate(movie);
      const response = await httpClient.put<ApiMovieResponse>(
        `/${id}`,
        apiMovie
      );
      return toDomain(response.data);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      throw new Error(`Failed to update movie with id ${id}: ${error}`);
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await httpClient.delete(`/${id}`);
      return true;
    } catch (error: any) {
      if (error.status === 404) {
        return false;
      }
      throw new Error(`Failed to delete movie with id ${id}: ${error}`);
    }
  },
});
