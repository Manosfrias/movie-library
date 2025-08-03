import { describe, it, expect } from 'vitest';
import { Movie } from '@/core/models/movie';
import {
  createGenreMappings,
  getSelectedGenreTranslation,
  handleGenreToggle,
} from './filterMovies.utils';

describe('filterMovies.utils', () => {
  const sampleMovies: Movie[] = [
    {
      id: '1',
      title: 'Movie 1',
      director: 'Director 1',
      releaseYear: 2020,
      genre: 'Action',
      rating: 8.0,
      favorite: false,
    },
    {
      id: '2',
      title: 'Movie 2',
      director: 'Director 2',
      releaseYear: 2021,
      genre: 'Comedy',
      rating: 7.5,
      favorite: true,
    },
    {
      id: '3',
      title: 'Movie 3',
      director: 'Director 3',
      releaseYear: 2022,
      genre: 'Action',
      rating: 9.0,
      favorite: false,
    },
  ];

  const mockGetGenreText = (genre: string) => {
    const translations: Record<string, string> = {
      Action: 'Acción',
      Comedy: 'Comedia',
      Drama: 'Drama',
    };
    return translations[genre] || genre;
  };

  describe('createGenreMappings', () => {
    it('should create correct genre mappings', () => {
      const result = createGenreMappings(sampleMovies, mockGetGenreText);

      expect(result.genreMap).toEqual({
        Action: 'Acción',
        Comedy: 'Comedia',
      });

      expect(result.translationMap).toEqual({
        Acción: 'Action',
        Comedia: 'Comedy',
      });

      expect(result.filterOptions).toEqual(['Acción', 'Comedia']);
    });

    it('should sort genres alphabetically', () => {
      const moviesWithUnsortedGenres: Movie[] = [
        {
          id: '1',
          title: 'Movie 1',
          director: 'Director 1',
          releaseYear: 2020,
          genre: 'Drama',
          rating: 8.0,
          favorite: false,
        },
        {
          id: '2',
          title: 'Movie 2',
          director: 'Director 2',
          releaseYear: 2021,
          genre: 'Action',
          rating: 7.5,
          favorite: true,
        },
        {
          id: '3',
          title: 'Movie 3',
          director: 'Director 3',
          releaseYear: 2022,
          genre: 'Comedy',
          rating: 9.0,
          favorite: false,
        },
      ];

      const result = createGenreMappings(
        moviesWithUnsortedGenres,
        mockGetGenreText
      );
      expect(result.filterOptions).toEqual(['Acción', 'Comedia', 'Drama']);
    });
  });

  describe('getSelectedGenreTranslation', () => {
    const genreMap = { Action: 'Acción', Comedy: 'Comedia' };

    it('should return undefined for "Todos los Géneros"', () => {
      const result = getSelectedGenreTranslation('Todos los Géneros', genreMap);
      expect(result).toBeUndefined();
    });

    it('should return translation for existing genre', () => {
      const result = getSelectedGenreTranslation('Action', genreMap);
      expect(result).toBe('Acción');
    });

    it('should return original genre if no translation exists', () => {
      const result = getSelectedGenreTranslation('Unknown', genreMap);
      expect(result).toBe('Unknown');
    });
  });

  describe('handleGenreToggle', () => {
    const translationMap = { Acción: 'Action', Comedia: 'Comedy' };

    it('should toggle off when same genre is selected', () => {
      const result = handleGenreToggle('Acción', 'Action', translationMap);
      expect(result).toBe('Todos los Géneros');
    });

    it('should select new genre when different genre is clicked', () => {
      const result = handleGenreToggle('Comedia', 'Action', translationMap);
      expect(result).toBe('Comedy');
    });

    it('should select genre when none is currently selected', () => {
      const result = handleGenreToggle(
        'Acción',
        'Todos los Géneros',
        translationMap
      );
      expect(result).toBe('Action');
    });
  });
});
