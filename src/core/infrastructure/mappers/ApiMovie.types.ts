export interface ApiMovieResponse {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  director: string;
  rating: number;
  favorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiMovieRequest {
  title: string;
  releaseYear: number;
  genre: string;
  director: string;
  rating: number;
  favorite?: boolean;
}
