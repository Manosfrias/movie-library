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
  setShowOnlyFavorites: (show: boolean) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSearchCriteria: (criteria: string) => void;
  setSelectedGenre: (genre: string) => Promise<void>;
  setSortBy: (sort: string) => Promise<void>;
  clearAllFilters: () => Promise<void>;
  toggleFavorite: (movieId: string) => void;
  loadMovies: () => Promise<void>;
  addMovie: (movie: Omit<Movie, 'id'>) => Promise<void>;
  deleteMovie: (movieId: string) => Promise<void>;
}

export interface MoviesProviderProps {
  children: React.ReactNode;
}
