import { useEffect, useState } from 'react';
import { defaultFilters } from './filtersConstants';
import { loadFiltersFromStorage, saveFiltersToStorage } from './filtersStorage';
import { FiltersState } from './filtersTypes';

export const useFiltersState = () => {
  const [mounted, setMounted] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(
    defaultFilters.showOnlyFavorites
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    defaultFilters.searchQuery
  );
  const [searchCriteria, setSearchCriteria] = useState<string>(
    defaultFilters.searchCriteria
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    defaultFilters.selectedGenre
  );
  const [sortBy, setSortBy] = useState<string>(defaultFilters.sortBy);

  useEffect(() => {
    const savedFilters = loadFiltersFromStorage();
    setShowOnlyFavorites(savedFilters.showOnlyFavorites);
    setSearchQuery(savedFilters.searchQuery);
    setSearchCriteria(savedFilters.searchCriteria);
    setSelectedGenre(savedFilters.selectedGenre);
    setSortBy(savedFilters.sortBy);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentFilters: FiltersState = {
      showOnlyFavorites,
      searchQuery,
      searchCriteria,
      selectedGenre,
      sortBy,
    };

    saveFiltersToStorage(currentFilters);
  }, [
    mounted,
    showOnlyFavorites,
    searchQuery,
    searchCriteria,
    selectedGenre,
    sortBy,
  ]);

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
