import { cookies } from 'next/headers';

export interface MovieFilters {
  showOnlyFavorites: boolean;
  selectedGenre: string;
  sortBy: string;
}

const COOKIE_NAME = 'movie-filters';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export const getFiltersFromCookies = (): MovieFilters => {
  const cookieStore = cookies();
  const filtersCookie = cookieStore.get(COOKIE_NAME);
  
  if (!filtersCookie) {
    return {
      showOnlyFavorites: false,
      selectedGenre: 'Todos los Géneros',
      sortBy: '',
    };
  }

  try {
    return JSON.parse(filtersCookie.value);
  } catch {
    return {
      showOnlyFavorites: false,
      selectedGenre: 'Todos los Géneros',
      sortBy: '',
    };
  }
};

export const setFiltersCookie = (filters: MovieFilters) => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(filters), {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false, // Necesario para acceso desde cliente
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};
