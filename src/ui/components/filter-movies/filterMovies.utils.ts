import { Movie } from '@/core/models/movie';
import { GenreMappings } from './types';

export const createGenreMappings = (
  movies: Movie[],
  getGenreText: (genre: string) => string
): GenreMappings => {
  const genreSet = new Set<string>();

  movies.forEach((movie) => {
    genreSet.add(movie.genre);
  });

  const sortedGenres = Array.from(genreSet).sort((a, b) => a.localeCompare(b));

  const map: Record<string, string> = {};
  const reverseMap: Record<string, string> = {};

  sortedGenres.forEach((genre) => {
    const translated = getGenreText(genre);
    map[genre] = translated;
    reverseMap[translated] = genre;
  });

  const options = sortedGenres.map((genre) => map[genre]);

  return {
    genreMap: map,
    translationMap: reverseMap,
    filterOptions: options,
  };
};

export const getSelectedGenreTranslation = (
  selectedGenre: string,
  genreMap: Record<string, string>
): string | undefined => {
  if (selectedGenre === 'Todos los Géneros') {
    return undefined;
  }
  return genreMap[selectedGenre] || selectedGenre;
};

export const handleGenreToggle = (
  option: string,
  selectedGenre: string,
  translationMap: Record<string, string>
): string => {
  const originalGenre = translationMap[option] || option;

  if (selectedGenre === originalGenre) {
    return 'Todos los Géneros';
  } else {
    return originalGenre;
  }
};
