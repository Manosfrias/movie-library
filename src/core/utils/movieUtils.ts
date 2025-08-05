import { Movie } from '../models/movie';

export const formatRating = (rating: number, decimals: number = 1): string => {
  return rating.toFixed(decimals);
};

export const formatYear = (year: number): string => {
  return year.toString();
};

export const formatTitle = (title: string): string => {
  return title.trim();
};

export const formatDirector = (director: string): string => {
  return director.trim();
};

export const formatGenre = (genre: string): string => {
  return genre.trim();
};

export const getMovieDisplayName = (movie: Movie): string => {
  return `${movie.title} (${movie.releaseYear})`;
};

export const getMovieSearchableText = (movie: Movie): string => {
  return [
    movie.title,
    movie.director,
    movie.genre,
    movie.releaseYear.toString(),
    movie.rating.toString(),
  ]
    .join(' ')
    .toLowerCase();
};

export const isValidRating = (rating: number): boolean => {
  return rating >= 0 && rating <= 10;
};

export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1800 && year <= currentYear;
};

export const calculateAverageRating = (movies: Movie[]): number => {
  if (movies.length === 0) return 0;

  const sum = movies.reduce((acc, movie) => acc + movie.rating, 0);
  return Number((sum / movies.length).toFixed(2));
};

export const getTopRatedMovies = (
  movies: Movie[],
  count: number = 5
): Movie[] => {
  return [...movies].sort((a, b) => b.rating - a.rating).slice(0, count);
};

export const getRecentMovies = (
  movies: Movie[],
  count: number = 5
): Movie[] => {
  return [...movies]
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, count);
};

export const getFavoriteMovies = (movies: Movie[]): Movie[] => {
  return movies.filter((movie) => movie.favorite);
};

export const getMoviesByDecade = (movies: Movie[]): Record<string, Movie[]> => {
  return movies.reduce(
    (acc, movie) => {
      const decade = `${Math.floor(movie.releaseYear / 10) * 10}s`;
      if (!acc[decade]) {
        acc[decade] = [];
      }
      acc[decade].push(movie);
      return acc;
    },
    {} as Record<string, Movie[]>
  );
};

export const isValidMovieData = (data: Partial<Movie>): boolean => {
  return !!(
    data.title &&
    data.director &&
    data.genre &&
    data.releaseYear &&
    data.rating !== undefined &&
    isValidYear(data.releaseYear) &&
    isValidRating(data.rating)
  );
};

export const sanitizeMovieData = (data: Partial<Movie>): Partial<Movie> => {
  return {
    ...data,
    title: data.title ? formatTitle(data.title) : data.title,
    director: data.director ? formatDirector(data.director) : data.director,
    genre: data.genre ? formatGenre(data.genre) : data.genre,
    rating:
      data.rating !== undefined
        ? Number(formatRating(data.rating, 1))
        : data.rating,
  };
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const createSearchIndex = (movies: Movie[]): Map<string, string[]> => {
  const index = new Map<string, string[]>();

  movies.forEach((movie) => {
    const words = getMovieSearchableText(movie).split(/\s+/);
    words.forEach((word) => {
      if (word.length > 2) {
        if (!index.has(word)) {
          index.set(word, []);
        }
        index.get(word)!.push(movie.id);
      }
    });
  });

  return index;
};

export const compareMovies = (
  movieA: Movie,
  movieB: Movie,
  field: keyof Movie
): number => {
  const valueA = movieA[field];
  const valueB = movieB[field];

  if (typeof valueA === 'string' && typeof valueB === 'string') {
    return valueA.localeCompare(valueB);
  }

  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueA - valueB;
  }

  if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
    return valueA === valueB ? 0 : valueA ? 1 : -1;
  }

  return 0;
};

export const isDuplicateMovie = (movie1: Movie, movie2: Movie): boolean => {
  return (
    movie1.title.toLowerCase() === movie2.title.toLowerCase() &&
    movie1.director.toLowerCase() === movie2.director.toLowerCase() &&
    movie1.releaseYear === movie2.releaseYear
  );
};
