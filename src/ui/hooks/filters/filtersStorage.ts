import config from '@/config/env';
import { defaultFilters } from './filtersConstants';
import { FiltersState } from './filtersTypes';

export const loadFiltersFromStorage = (): FiltersState => {
  if (typeof window === 'undefined') return defaultFilters;

  try {
    const saved = localStorage.getItem(config.storage.filtersKey);
    return saved ? { ...defaultFilters, ...JSON.parse(saved) } : defaultFilters;
  } catch {
    return defaultFilters;
  }
};

export const saveFiltersToStorage = (filters: FiltersState): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(config.storage.filtersKey, JSON.stringify(filters));
  } catch {
    return;
  }
};
