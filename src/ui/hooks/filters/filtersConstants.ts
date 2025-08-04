import { FiltersState } from './filtersTypes';

export const defaultFilters: FiltersState = {
  showOnlyFavorites: false,
  searchQuery: '',
  searchCriteria: 'byTitle',
  selectedGenre: 'Todos los Géneros',
  sortBy: '',
};
