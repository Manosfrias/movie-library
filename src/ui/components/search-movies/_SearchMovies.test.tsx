import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchMovies from './SearchMovies';

// Mock del contexto de películas usando vi.hoisted para evitar problemas de hoisting
const mockUseMovies = vi.hoisted(() => vi.fn());
vi.mock('@/ui/context/MoviesContext', () => ({
  useMovies: mockUseMovies,
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getSearchText: (key: string) => {
      if (key === 'placeholder') return 'Buscar películas...';
      return key;
    },
    getSearchCriteria: (key: string) => {
      if (key === 'byTitle') return 'Por Título';
      if (key === 'byDirector') return 'Por Director';
      if (key === 'byReleaseDate') return 'Por Año de Estreno';
      if (key === 'byRating') return 'Por Calificación';
      return key;
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('SearchMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto del mock
    mockUseMovies.mockReturnValue({
      searchQuery: '',
      setSearchQuery: vi.fn(),
      searchCriteria: 'byTitle',
      setSearchCriteria: vi.fn(),
      movies: [],
      filteredMovies: [],
      loading: false,
      showOnlyFavorites: false,
      selectedGenre: 'Todos los Géneros',
      sortBy: '',
      setShowOnlyFavorites: vi.fn(),
      setSelectedGenre: vi.fn(),
      setSortBy: vi.fn(),
      toggleFavorite: vi.fn(),
    });
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly', () => {
    render(<SearchMovies />);

    expect(
      screen.getByPlaceholderText('Buscar películas...')
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('Por Título')).toBeInTheDocument();
  });

  it('should have search input functionality and update context', () => {
    const mockSetSearchQuery = vi.fn();
    mockUseMovies.mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      searchCriteria: 'byTitle',
      setSearchCriteria: vi.fn(),
    });

    render(<SearchMovies />);

    const searchInput = screen.getByPlaceholderText('Buscar películas...');
    fireEvent.change(searchInput, { target: { value: 'Inception' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Inception');
    expect(consoleSpy).toHaveBeenCalledWith('Buscando:', 'Inception');
  });

  it('should have "By Title" selected by default', () => {
    render(<SearchMovies />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('byTitle');
  });

  it('should update search criteria when option is selected', () => {
    const mockSetSearchCriteria = vi.fn();
    mockUseMovies.mockReturnValue({
      searchQuery: '',
      setSearchQuery: vi.fn(),
      searchCriteria: 'byTitle',
      setSearchCriteria: mockSetSearchCriteria,
    });

    render(<SearchMovies />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'byDirector' } });

    expect(mockSetSearchCriteria).toHaveBeenCalledWith('byDirector');
  });

  it('should render all search criteria options', () => {
    render(<SearchMovies />);

    const expectedCriteria = [
      'Por Título',
      'Por Director',
      'Por Año de Estreno',
      'Por Calificación',
    ];
    expectedCriteria.forEach((criteria) => {
      expect(screen.getByText(criteria)).toBeInTheDocument();
    });
  });
});
