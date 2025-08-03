import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrderMovies from './OrderMovies';

// Mock del contexto de películas usando vi.hoisted para evitar problemas de hoisting
const mockUseMovies = vi.hoisted(() => vi.fn());
vi.mock('@/ui/context/MoviesContext', () => ({
  useMovies: mockUseMovies,
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getOrderText: () => 'Ordenar Películas',
    getOrderOptions: (key: string) => {
      if (key === 'byTitle') return 'Por Título';
      if (key === 'byDirector') return 'Por Director';
      if (key === 'byReleaseDate') return 'Por Fecha de Estreno';
      if (key === 'byRating') return 'Por Calificación';
      return key;
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('OrderMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto del mock
    mockUseMovies.mockReturnValue({
      sortBy: '',
      setSortBy: vi.fn(),
      movies: [],
      filteredMovies: [],
      loading: false,
      showOnlyFavorites: false,
      searchQuery: '',
      searchCriteria: 'byTitle',
      selectedGenre: 'Todos los Géneros',
      setShowOnlyFavorites: vi.fn(),
      setSearchQuery: vi.fn(),
      setSearchCriteria: vi.fn(),
      setSelectedGenre: vi.fn(),
      toggleFavorite: vi.fn(),
    });
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly', () => {
    render(<OrderMovies />);

    expect(screen.getByText('Ordenar Películas')).toBeInTheDocument();
    expect(screen.getByText('Por Título')).toBeInTheDocument();
    expect(screen.getByText('Por Director')).toBeInTheDocument();
    expect(screen.getByText('Por Fecha de Estreno')).toBeInTheDocument();
    expect(screen.getByText('Por Calificación')).toBeInTheDocument();
  });

  it('should handle order selection and update context', () => {
    const mockSetSortBy = vi.fn();
    mockUseMovies.mockReturnValue({
      sortBy: '',
      setSortBy: mockSetSortBy,
    });

    render(<OrderMovies />);

    fireEvent.click(screen.getByText('Por Título'));
    expect(mockSetSortBy).toHaveBeenCalledWith('Por Título');
  });

  it('should render all order options', () => {
    render(<OrderMovies />);

    const expectedOptions = [
      'Por Título',
      'Por Director',
      'Por Fecha de Estreno',
      'Por Calificación',
    ];
    expectedOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
