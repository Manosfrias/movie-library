import React from 'react';
import { useTexts } from '@/ui/hooks/useTexts';
import { useMovies } from '@/ui/context/MoviesContext';
import {
  createGenreMappings,
  getSelectedGenreTranslation,
  handleGenreToggle,
} from './filterMovies.utils';

export const useFilterMovies = () => {
  const { getGenreText } = useTexts();
  const { selectedGenre, setSelectedGenre, movies } = useMovies();

  const { genreMap, translationMap, filterOptions } = React.useMemo(() => {
    return createGenreMappings(movies, (genre) =>
      getGenreText(genre as keyof typeof import('@/ui/locales/es').TEXTS.genres)
    );
  }, [movies, getGenreText]);

  const getTranslatedSelectedGenre = () => {
    return getSelectedGenreTranslation(selectedGenre, genreMap);
  };

  const handleFilterChange = async (option: string) => {
    const newGenre = handleGenreToggle(option, selectedGenre, translationMap);
    await setSelectedGenre(newGenre);
  };

  return {
    filterOptions,
    getTranslatedSelectedGenre,
    handleFilterChange,
  };
};
