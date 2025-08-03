'use client';

import { useState, useEffect } from 'react';
import { MovieFilters } from '../lib/cookies';
import {
  updateShowOnlyFavorites,
  updateSelectedGenre,
  updateSortBy,
  clearAllFilters as clearFiltersAction,
} from '../actions/filterActions';

interface UsePersistentFiltersProps {
  initialFilters: MovieFilters;
}

export const usePersistentFilters = ({
  initialFilters,
}: UsePersistentFiltersProps) => {
  const [showOnlyFavorites, setShowOnlyFavoritesState] = useState(
    initialFilters.showOnlyFavorites
  );
  const [selectedGenre, setSelectedGenreState] = useState(
    initialFilters.selectedGenre
  );
  const [sortBy, setSortByState] = useState(initialFilters.sortBy);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<string>('byTitle');

  const setShowOnlyFavorites = async (value: boolean) => {
    setShowOnlyFavoritesState(value);
    await updateShowOnlyFavorites(value);
  };

  const setSelectedGenre = async (value: string) => {
    setSelectedGenreState(value);
    await updateSelectedGenre(value);
  };

  const setSortBy = async (value: string) => {
    setSortByState(value);
    await updateSortBy(value);
  };

  const clearAllFilters = async () => {
    setShowOnlyFavoritesState(false);
    setSelectedGenreState('Todos los Géneros');
    setSortByState('');
    setSearchQuery('');
    setSearchCriteria('byTitle');
    await clearFiltersAction();
  };

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const value = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];

      if (!value) return null;

      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return null;
      }
    };

    const checkCookieChanges = () => {
      const cookieFilters = getCookieValue(
        'movie-filters'
      ) as MovieFilters | null;
      if (cookieFilters) {
        setShowOnlyFavoritesState(cookieFilters.showOnlyFavorites);
        setSelectedGenreState(cookieFilters.selectedGenre);
        setSortByState(cookieFilters.sortBy);
      }
    };

    const interval = setInterval(checkCookieChanges, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    showOnlyFavorites,
    setShowOnlyFavorites,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,

    searchQuery,
    setSearchQuery,
    searchCriteria,
    setSearchCriteria,

    clearAllFilters,
  };
};
