import { sampleMovies } from '@/core/data/sampleMovies';
import { Movie } from '@/core/models/movie';
import { MovieRepository } from '@/core/models/repository';

const STORAGE_KEY = 'movie-library-movies';

const generateId = (): string =>
  `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const loadFromStorage = (): Movie[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const movies = JSON.parse(stored);
      return movies.length > 0 ? movies : sampleMovies;
    }
    return sampleMovies;
  } catch (error) {
    console.warn('Failed to load movies from localStorage:', error);
    return sampleMovies;
  }
};

const saveToStorage = (movies: Movie[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.warn('Failed to save movies to localStorage:', error);
  }
};

export const createLocalMovieRepository = (): MovieRepository & {
  clear: () => void;
  seed: (movies: Movie[]) => void;
  seedWithSample: () => void;
  getSampleMovies: () => Movie[];
} => {
  let movies = loadFromStorage();

  const saveMovies = (newMovies: Movie[]) => {
    movies = newMovies;
    saveToStorage(movies);
  };

  return {
    async findAll(): Promise<Movie[]> {
      return [...movies];
    },

    async findById(id: string): Promise<Movie | null> {
      return movies.find((m) => m.id === id) || null;
    },

    async create(movie: Omit<Movie, 'id'>): Promise<Movie> {
      const newMovie: Movie = {
        ...movie,
        id: generateId(),
      };

      const updatedMovies = [...movies, newMovie];
      saveMovies(updatedMovies);

      return newMovie;
    },

    async update(id: string, movie: Movie): Promise<Movie | null> {
      const index = movies.findIndex((m) => m.id === id);

      if (index === -1) {
        return null;
      }

      const updatedMovie = { ...movie, id };
      const updatedMovies = [...movies];
      updatedMovies[index] = updatedMovie;
      saveMovies(updatedMovies);

      return updatedMovie;
    },

    async delete(id: string): Promise<boolean> {
      const index = movies.findIndex((m) => m.id === id);

      if (index === -1) {
        return false;
      }

      const updatedMovies = movies.filter((m) => m.id !== id);
      saveMovies(updatedMovies);

      return true;
    },

    clear(): void {
      saveMovies([]);
    },

    seed(seedMovies: Movie[]): void {
      saveMovies([...seedMovies]);
    },

    seedWithSample(): void {
      saveMovies([...sampleMovies]);
    },

    getSampleMovies(): Movie[] {
      return [...sampleMovies];
    },
  };
};
