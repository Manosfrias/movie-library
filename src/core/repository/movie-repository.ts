export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  director: string;
  duration: number; // in minutes
  rating?: number;
}

export interface CreateMovieDto {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  director: string;
  duration: number;
  rating?: number;
}

export interface UpdateMovieDto {
  title?: string;
  description?: string;
  releaseDate?: Date;
  genre?: string;
  director?: string;
  duration?: number;
  rating?: number;
}

export interface MovieRepository {
  findAll(): Promise<Movie[]>;
  findById(id: string): Promise<Movie | null>;
  create(movieDto: CreateMovieDto): Promise<Movie>;
  update(id: string, movieDto: UpdateMovieDto): Promise<Movie | null>;
  delete(id: string): Promise<boolean>;
}
