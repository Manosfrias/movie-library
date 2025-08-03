import { Movie } from '../../core/models/movie';

export interface MoviesContextType {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  showOnlyFavorites: boolean;
  searchQuery: string;
  searchCriteria: string;
  selectedGenre: string;
  sortBy: string;
  setShowOnlyFavorites: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSearchCriteria: (criteria: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSortBy: (sort: string) => void;
  toggleFavorite: (movieId: string) => void;
  loadMovies: () => Promise<void>;
  addMovie: (movie: Omit<Movie, 'id'>) => Promise<void>;
  deleteMovie: (movieId: string) => Promise<void>;
}

export interface MoviesProviderProps {
  children: React.ReactNode;
}
