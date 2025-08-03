import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterMovies from './FilterMovies';
import asideCardStyles from '../aside-card/AsideCard.module.css';

// Mock del contexto de películas usando vi.hoisted para evitar problemas de hoisting
const mockUseMovies = vi.hoisted(() => vi.fn());
vi.mock('@/ui/context/MoviesContext', () => ({
  useMovies: mockUseMovies,
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getFilterText: (key: string) => {
      if (key === 'title') return 'Filtrar Películas';
      return key;
    },
    getFilterOptions: (key: string) => {
      if (key === 'allGenres') return 'Todos los Géneros';
      return key;
    },
    getGenreText: (genre: string) => {
      const translations: Record<string, string> = {
        Action: 'Acción',
        Comedy: 'Comedia',
        Drama: 'Drama',
        Crime: 'Crimen',
        Adventure: 'Aventura',
        'Sci-Fi': 'Ciencia Ficción',
      };
      return translations[genre] || genre;
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('FilterMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto del mock
    mockUseMovies.mockReturnValue({
      selectedGenre: 'Todos los Géneros',
      setSelectedGenre: vi.fn(),
      movies: [
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
          genre: 'Drama',
          rating: 9.0,
          favorite: false,
        },
      ],
      filteredMovies: [],
      loading: false,
      showOnlyFavorites: false,
      searchQuery: '',
      searchCriteria: 'byTitle',
      sortBy: '',
      setShowOnlyFavorites: vi.fn(),
      setSearchQuery: vi.fn(),
      setSearchCriteria: vi.fn(),
      setSortBy: vi.fn(),
      toggleFavorite: vi.fn(),
    });
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly', () => {
    render(<FilterMovies />);

    expect(screen.getByText(/Filtrar Películas/)).toBeInTheDocument();
    expect(screen.queryByText(/Todos los Géneros/)).not.toBeInTheDocument(); // Ya no existe
    expect(screen.getByText('Acción')).toBeInTheDocument();
    expect(screen.getByText('Comedia')).toBeInTheDocument();
  });

  it('should have no genre selected by default (showing all)', () => {
    render(<FilterMovies />);

    // Verificar que ningún botón esté seleccionado por defecto
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).not.toHaveClass(asideCardStyles.selected);
    });
  });

  it('should handle filter selection and update context', () => {
    const mockSetSelectedGenre = vi.fn();
    mockUseMovies.mockReturnValue({
      selectedGenre: 'Todos los Géneros',
      setSelectedGenre: mockSetSelectedGenre,
      movies: [
        {
          id: '1',
          title: 'Movie 1',
          director: 'Director 1',
          releaseYear: 2020,
          genre: 'Action',
          rating: 8.0,
          favorite: false,
        },
      ],
      filteredMovies: [],
      loading: false,
      showOnlyFavorites: false,
      searchQuery: '',
      searchCriteria: 'byTitle',
      sortBy: '',
      setShowOnlyFavorites: vi.fn(),
      setSearchQuery: vi.fn(),
      setSearchCriteria: vi.fn(),
      setSortBy: vi.fn(),
      toggleFavorite: vi.fn(),
      loadMovies: vi.fn(),
      addMovie: vi.fn(),
      deleteMovie: vi.fn(),
    });

    render(<FilterMovies />);

    fireEvent.click(screen.getByText('Acción'));
    expect(mockSetSelectedGenre).toHaveBeenCalledWith('Action');
  });

  it('should toggle genre selection (deselect when clicking same genre)', () => {
    const mockSetSelectedGenre = vi.fn();
    mockUseMovies.mockReturnValue({
      selectedGenre: 'Action', // Ya seleccionado
      setSelectedGenre: mockSetSelectedGenre,
      movies: [
        {
          id: '1',
          title: 'Movie 1',
          director: 'Director 1',
          releaseYear: 2020,
          genre: 'Action',
          rating: 8.0,
          favorite: false,
        },
      ],
      filteredMovies: [],
      loading: false,
      showOnlyFavorites: false,
      searchQuery: '',
      searchCriteria: 'byTitle',
      sortBy: '',
      setShowOnlyFavorites: vi.fn(),
      setSearchQuery: vi.fn(),
      setSearchCriteria: vi.fn(),
      setSortBy: vi.fn(),
      toggleFavorite: vi.fn(),
      loadMovies: vi.fn(),
      addMovie: vi.fn(),
      deleteMovie: vi.fn(),
    });

    render(<FilterMovies />);

    // Hacer clic en el género ya seleccionado debe desactivarlo
    fireEvent.click(screen.getByText('Acción'));
    expect(mockSetSelectedGenre).toHaveBeenCalledWith('Todos los Géneros');
  });

  it('should render all filter options', () => {
    render(<FilterMovies />);

    const expectedOptions = ['Acción', 'Comedia', 'Drama'];
    expectedOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    // Verificar que "Todos los Géneros" ya no aparezca
    expect(screen.queryByText(/Todos los Géneros/)).not.toBeInTheDocument();
  });
});
