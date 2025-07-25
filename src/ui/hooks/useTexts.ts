import { TEXTS } from '../locales/es';

export function useTexts() {
  return {
    texts: TEXTS,
    getHomeText: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
    getMovieDetailText: (key: keyof typeof TEXTS.movieDetail) =>
      TEXTS.movieDetail[key],
    getCommonText: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
    getMetaText: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
  };
}

export const getText = {
  home: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
  movieDetail: (key: keyof typeof TEXTS.movieDetail) => TEXTS.movieDetail[key],
  common: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
  meta: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
};
