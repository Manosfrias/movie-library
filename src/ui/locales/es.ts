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
    fields: {
      director: 'Director',
      releaseYear: 'Año de Estreno',
      genre: 'Género',
      favorite: 'Favorito',
      rating: '/ 10',
    },
    favoriteStatus: {
      yes: 'Sí',
      no: 'No',
    },
  },

  search: {
    title: 'Buscar Películas',
    placeholder: 'Buscar películas...',
    criteria: {
      byTitle: 'Por Título',
      byDirector: 'Por Director',
      byReleaseDate: 'Por Año de Estreno',
      byRating: 'Por Calificación',
    },
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
    },
  },

  genres: {
    Action: 'Acción',
    Adventure: 'Aventura',
    Comedy: 'Comedia',
    Crime: 'Crimen',
    Drama: 'Drama',
    Horror: 'Terror',
    Romance: 'Romance',
    'Sci-Fi': 'Ciencia Ficción',
    Thriller: 'Thriller',
  },

  common: {
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    retry: 'Reintentar',
    back: 'Volver',
    viewDetails: 'Ver más',
  },

  navigation: {
    previous: 'Anterior',
    next: 'Siguiente',
  },

  badge: {
    favorite: 'Favorito',
    featured: 'Destacado',
  },

  favoriteToggle: {
    showAll: 'Mostrar Todas',
    showOnlyFavorites: 'Mostrar Favoritas',
  },

  addMovie: {
    title: 'Agregar Nueva Película',
    form: {
      title: 'Título',
      titlePlaceholder: 'Ej. El Padrino',
      director: 'Director',
      directorPlaceholder: 'Ej. Francis Ford Coppola',
      releaseYear: 'Año de lanzamiento',
      genre: 'Género',
      genreSelect: 'Selecciona un género',
      rating: 'Calificación (0-10)',
      ratingPlaceholder: 'Ej. 8.5',
      isFavorite: 'Marcar como favorita',
      required: '*',
    },
    actions: {
      cancel: 'Cancelar',
      save: 'Guardar película',
      saving: 'Guardando...',
    },
    validation: {
      titleRequired: 'El título es requerido',
      directorRequired: 'El director es requerido',
      releaseYearRequired: 'El año de lanzamiento es requerido',
      genreRequired: 'El género es requerido',
      ratingRequired: 'La calificación es requerida',
    },
  },

  editMovie: {
    title: 'Editar Película',
    actions: {
      edit: 'Editar',
      cancel: 'Cancelar',
      save: 'Guardar cambios',
      saving: 'Guardando...',
    },
  },

  deleteMovie: {
    title: 'Eliminar Película',
    confirmMessage: '¿Estás seguro de que quieres eliminar esta película?',
    confirmDescription: 'Esta acción no se puede deshacer.',
    actions: {
      delete: 'Eliminar',
      cancel: 'Cancelar',
      confirm: 'Sí, eliminar',
      deleting: 'Eliminando...',
    },
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
export type MovieDetailFieldsTextKeys = keyof TextKeys['movieDetail']['fields'];
export type MovieDetailFavoriteStatusTextKeys =
  keyof TextKeys['movieDetail']['favoriteStatus'];
export type SearchTextKeys = keyof TextKeys['search'];
export type OrderTextKeys = keyof TextKeys['order'];
export type FilterTextKeys = keyof TextKeys['filter'];
export type AddMovieTextKeys = keyof TextKeys['addMovie'];
export type EditMovieTextKeys = keyof TextKeys['editMovie'];
export type DeleteMovieTextKeys = keyof TextKeys['deleteMovie'];
export type CommonTextKeys = keyof TextKeys['common'];
export type NavigationTextKeys = keyof TextKeys['navigation'];
export type MetaTextKeys = keyof TextKeys['meta'];
