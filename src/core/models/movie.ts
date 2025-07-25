export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  director: string;
  rating: number;
  favorite?: boolean;
}
