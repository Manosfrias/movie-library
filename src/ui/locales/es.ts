export const TEXTS = {
  home: {
    title: 'Mi Filmoteca',
    description:
      'Tu gestor personal de colección de películas construido con Next.js y TypeScript',
  },

  movieDetail: {
    title: 'Detalle de Película',
    notFound: 'Película no encontrada',
    loading: 'Cargando...',
  },

  search: {
    title: 'Buscar Películas',
    placeholder: 'Buscar películas...',
  },

  movieOfTheDay: {
    title: 'Película del Día',
  },

  order: {
    title: 'Ordenar Películas',
    options: {
      byTitle: 'Por Título',
      byDirector: 'Por Director',
      byReleaseDate: 'Por Fecha de Estreno',
      byRating: 'Por Calificación',
    },
  },

  filter: {
    title: 'Filtrar Películas',
    options: {
      allGenres: 'Todos los Géneros',
      action: 'Acción',
      comedy: 'Comedia',
      drama: 'Drama',
      horror: 'Terror',
      romance: 'Romance',
      sciFi: 'Ciencia Ficción',
      thriller: 'Thriller',
    },
  },

  common: {
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    retry: 'Reintentar',
    back: 'Volver',
  },

  badge: {
    favorite: 'Favorito',
    featured: 'Destacado',
  },

  favoriteToggle: {
    showAll: 'Mostrar Todas',
    showOnlyFavorites: 'Mostrar Favoritas',
  },

  meta: {
    title: 'Movie Library',
    description:
      'Una aplicación de biblioteca de películas construida con Next.js y TypeScript',
  },
} as const;

export type TextKeys = typeof TEXTS;
export type TextPath = keyof TextKeys;
export type HomeTextKeys = keyof TextKeys['home'];
export type MovieDetailTextKeys = keyof TextKeys['movieDetail'];
export type SearchTextKeys = keyof TextKeys['search'];
export type OrderTextKeys = keyof TextKeys['order'];
export type FilterTextKeys = keyof TextKeys['filter'];
export type CommonTextKeys = keyof TextKeys['common'];
export type MetaTextKeys = keyof TextKeys['meta'];
