import { TEXTS } from '../locales/es';

export function useTexts() {
  return {
    texts: TEXTS,
    getHomeText: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
    getMovieDetailText: (key: keyof typeof TEXTS.movieDetail) =>
      TEXTS.movieDetail[key],
    getSearchText: (key: keyof typeof TEXTS.search) => TEXTS.search[key],
    getMovieOfTheDayText: (key: keyof typeof TEXTS.movieOfTheDay) =>
      TEXTS.movieOfTheDay[key],
    getOrderText: (key: keyof typeof TEXTS.order) => TEXTS.order[key],
    getOrderOptions: (key: keyof typeof TEXTS.order.options) =>
      TEXTS.order.options[key],
    getFilterText: (key: keyof typeof TEXTS.filter) => TEXTS.filter[key],
    getBadgeText: (key: keyof typeof TEXTS.badge) => TEXTS.badge[key],
    getFavoriteToggleText: (key: keyof typeof TEXTS.favoriteToggle) =>
      TEXTS.favoriteToggle[key],
    getCommonText: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
    getMetaText: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
  };
}

export const getText = {
  home: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
  movieDetail: (key: keyof typeof TEXTS.movieDetail) => TEXTS.movieDetail[key],
  search: (key: keyof typeof TEXTS.search) => TEXTS.search[key],
  movieOfTheDay: (key: keyof typeof TEXTS.movieOfTheDay) =>
    TEXTS.movieOfTheDay[key],
  order: (key: keyof typeof TEXTS.order) => TEXTS.order[key],
  orderOptions: (key: keyof typeof TEXTS.order.options) =>
    TEXTS.order.options[key],
  filter: (key: keyof typeof TEXTS.filter) => TEXTS.filter[key],
  badge: (key: keyof typeof TEXTS.badge) => TEXTS.badge[key],
  favoriteToggle: (key: keyof typeof TEXTS.favoriteToggle) =>
    TEXTS.favoriteToggle[key],
  common: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
  meta: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
};
