'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { MovieFilters } from '../lib/cookies';

const COOKIE_NAME = 'movie-filters';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export async function updateShowOnlyFavorites(showOnlyFavorites: boolean) {
  const cookieStore = cookies();
  const currentFilters = getCurrentFilters();

  const newFilters: MovieFilters = {
    ...currentFilters,
    showOnlyFavorites,
  };

  cookieStore.set(COOKIE_NAME, JSON.stringify(newFilters), {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  revalidatePath('/');
}

export async function updateSelectedGenre(selectedGenre: string) {
  const cookieStore = cookies();
  const currentFilters = getCurrentFilters();

  const newFilters: MovieFilters = {
    ...currentFilters,
    selectedGenre,
  };

  cookieStore.set(COOKIE_NAME, JSON.stringify(newFilters), {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  revalidatePath('/');
}

export async function updateSortBy(sortBy: string) {
  const cookieStore = cookies();
  const currentFilters = getCurrentFilters();

  const newFilters: MovieFilters = {
    ...currentFilters,
    sortBy,
  };

  cookieStore.set(COOKIE_NAME, JSON.stringify(newFilters), {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  revalidatePath('/');
}

export async function clearAllFilters() {
  const cookieStore = cookies();

  const defaultFilters: MovieFilters = {
    showOnlyFavorites: false,
    selectedGenre: 'Todos los Géneros',
    sortBy: '',
  };

  cookieStore.set(COOKIE_NAME, JSON.stringify(defaultFilters), {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  revalidatePath('/');
}

function getCurrentFilters(): MovieFilters {
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
}
