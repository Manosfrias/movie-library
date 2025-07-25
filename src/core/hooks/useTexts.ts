import { TEXTS } from '../../ui/locales/es';

/**
 * Hook simple para acceder a los textos de la aplicación
 * Diseñado para ser fácilmente extensible hacia internacionalización
 */
export function useTexts() {
  // En el futuro, aquí podríamos añadir lógica de idioma
  // const locale = useLocale(); // Ejemplo para futuro i18n
  
  return {
    texts: TEXTS,
    // Funciones de utilidad para acceso tipado
    getHomeText: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
    getMovieDetailText: (key: keyof typeof TEXTS.movieDetail) => TEXTS.movieDetail[key],
    getCommonText: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
    getMetaText: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
  };
}

// Para componentes que no necesitan ser hooks, exportamos una función simple
export const getText = {
  home: (key: keyof typeof TEXTS.home) => TEXTS.home[key],
  movieDetail: (key: keyof typeof TEXTS.movieDetail) => TEXTS.movieDetail[key],
  common: (key: keyof typeof TEXTS.common) => TEXTS.common[key],
  meta: (key: keyof typeof TEXTS.meta) => TEXTS.meta[key],
};
