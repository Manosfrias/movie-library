import { useState } from 'react';

export const useFiltersState = () => {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<string>('byTitle');
  const [selectedGenre, setSelectedGenre] =
    useState<string>('Todos los Géneros');
  const [sortBy, setSortBy] = useState<string>('');

  return {
    showOnlyFavorites,
    setShowOnlyFavorites,
    searchQuery,
    setSearchQuery,
    searchCriteria,
    setSearchCriteria,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
  };
};
