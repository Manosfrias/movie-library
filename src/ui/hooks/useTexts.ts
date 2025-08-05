import { TEXTS } from '../locales/es';

export function useTexts() {
  return {
    texts: TEXTS,
    getHomeText: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
    getMovieDetailText: (key: keyof typeof TEXTS.movieDetail) =>
      TEXTS.movieDetail[key],
    getSearchText: (key: keyof typeof TEXTS.search) => TEXTS.search[key],
    getSearchCriteria: (key: keyof typeof TEXTS.search.criteria) =>
      TEXTS.search.criteria[key],
    getMovieOfTheDayText: (key: keyof typeof TEXTS.movieOfTheDay) =>
      TEXTS.movieOfTheDay[key],
    getOrderText: (key: keyof typeof TEXTS.order) => TEXTS.order[key],
    getOrderOptions: (key: keyof typeof TEXTS.order.options) =>
      TEXTS.order.options[key],
    getFilterText: (key: keyof typeof TEXTS.filter) => TEXTS.filter[key],
    getFilterOptions: (key: keyof typeof TEXTS.filter.options) =>
      TEXTS.filter.options[key],
    getGenreText: (genre: keyof typeof TEXTS.genres) =>
      TEXTS.genres[genre] || genre,
    getBadgeText: (key: keyof typeof TEXTS.badge) => TEXTS.badge[key],
    getFavoriteToggleText: (key: keyof typeof TEXTS.favoriteToggle) =>
      TEXTS.favoriteToggle[key],
    getAddMovieText: (key: keyof typeof TEXTS.addMovie) => TEXTS.addMovie[key],
    getAddMovieFormText: (key: keyof typeof TEXTS.addMovie.form) =>
      TEXTS.addMovie.form[key],
    getAddMovieActionsText: (key: keyof typeof TEXTS.addMovie.actions) =>
      TEXTS.addMovie.actions[key],
    getAddMovieValidationText: (key: keyof typeof TEXTS.addMovie.validation) =>
      TEXTS.addMovie.validation[key],
    getEditMovieText: (key: keyof typeof TEXTS.editMovie) =>
      TEXTS.editMovie[key],
    getEditMovieActionsText: (key: keyof typeof TEXTS.editMovie.actions) =>
      TEXTS.editMovie.actions[key],
    getDeleteMovieText: (key: keyof typeof TEXTS.deleteMovie) =>
      TEXTS.deleteMovie[key],
    getDeleteMovieActionsText: (key: keyof typeof TEXTS.deleteMovie.actions) =>
      TEXTS.deleteMovie.actions[key],
    getCommonText: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
    getMetaText: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
  };
}

export const getText = {
  home: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
  movieDetail: (key: keyof typeof TEXTS.movieDetail) => TEXTS.movieDetail[key],
  search: (key: keyof typeof TEXTS.search) => TEXTS.search[key],
  searchCriteria: (key: keyof typeof TEXTS.search.criteria) =>
    TEXTS.search.criteria[key],
  movieOfTheDay: (key: keyof typeof TEXTS.movieOfTheDay) =>
    TEXTS.movieOfTheDay[key],
  order: (key: keyof typeof TEXTS.order) => TEXTS.order[key],
  orderOptions: (key: keyof typeof TEXTS.order.options) =>
    TEXTS.order.options[key],
  filter: (key: keyof typeof TEXTS.filter) => TEXTS.filter[key],
  filterOptions: (key: keyof typeof TEXTS.filter.options) =>
    TEXTS.filter.options[key],
  genre: (genre: keyof typeof TEXTS.genres) => TEXTS.genres[genre] || genre,
  badge: (key: keyof typeof TEXTS.badge) => TEXTS.badge[key],
  favoriteToggle: (key: keyof typeof TEXTS.favoriteToggle) =>
    TEXTS.favoriteToggle[key],
  addMovie: (key: keyof typeof TEXTS.addMovie) => TEXTS.addMovie[key],
  addMovieForm: (key: keyof typeof TEXTS.addMovie.form) =>
    TEXTS.addMovie.form[key],
  addMovieActions: (key: keyof typeof TEXTS.addMovie.actions) =>
    TEXTS.addMovie.actions[key],
  addMovieValidation: (key: keyof typeof TEXTS.addMovie.validation) =>
    TEXTS.addMovie.validation[key],
  editMovie: (key: keyof typeof TEXTS.editMovie) => TEXTS.editMovie[key],
  editMovieActions: (key: keyof typeof TEXTS.editMovie.actions) =>
    TEXTS.editMovie.actions[key],
  deleteMovie: (key: keyof typeof TEXTS.deleteMovie) => TEXTS.deleteMovie[key],
  deleteMovieActions: (key: keyof typeof TEXTS.deleteMovie.actions) =>
    TEXTS.deleteMovie.actions[key],
  common: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
  meta: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
};
