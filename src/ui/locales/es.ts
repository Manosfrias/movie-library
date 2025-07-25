/**
 * Constantes de texto de la aplicación
 * Esta estructura permite fácil mantenimiento y futura internacionalización
 */

export const TEXTS = {
  // Páginas principales
  home: {
    title: 'Mi Filmoteca',
    description: 'Tu gestor personal de colección de películas construido con Next.js y TypeScript',
  },
  
  // Página de detalle
  movieDetail: {
    title: 'Detalle de Película',
    notFound: 'Película no encontrada',
    loading: 'Cargando...',
  },
  
  // Componentes comunes
  common: {
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    retry: 'Reintentar',
    back: 'Volver',
  },
  
  // Metadatos
  meta: {
    title: 'Movie Library',
    description: 'Una aplicación de biblioteca de películas construida con Next.js y TypeScript',
  },
} as const;

// Tipo para autocompletado y validación
export type TextKeys = typeof TEXTS;
export type TextPath = keyof TextKeys;
export type HomeTextKeys = keyof TextKeys['home'];
export type MovieDetailTextKeys = keyof TextKeys['movieDetail'];
export type CommonTextKeys = keyof TextKeys['common'];
export type MetaTextKeys = keyof TextKeys['meta'];
