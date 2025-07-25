import { Movie } from '../../../core/models/movie';

export interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
}
