import { Movie } from './movie';

export interface MovieRepository {
  findAll(): Promise<Movie[]>;
  findById(id: string): Promise<Movie | null>;
  create(movie: Movie): Promise<Movie>;
  update(id: string, movie: Movie): Promise<Movie | null>;
  delete(id: string): Promise<boolean>;
}
