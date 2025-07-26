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
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('FilterMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto del mock
    mockUseMovies.mockReturnValue({
      selectedGenre: 'All Genres',
      setSelectedGenre: vi.fn(),
      movies: [],
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

    expect(screen.getByText('Filtrar Películas')).toBeInTheDocument();
    expect(screen.getByText('All Genres')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });

  it('should have "All Genres" selected by default', () => {
    render(<FilterMovies />);

    const allGenresButton = screen.getByText('All Genres');
    expect(allGenresButton).toHaveClass(asideCardStyles.selected);
  });

  it('should handle filter selection and update context', () => {
    const mockSetSelectedGenre = vi.fn();
    mockUseMovies.mockReturnValue({
      selectedGenre: 'All Genres',
      setSelectedGenre: mockSetSelectedGenre,
    });

    render(<FilterMovies />);

    fireEvent.click(screen.getByText('Action'));
    expect(mockSetSelectedGenre).toHaveBeenCalledWith('Action');
    expect(consoleSpy).toHaveBeenCalledWith('Filtrar por género:', 'Action');
  });

  it('should render all filter options', () => {
    render(<FilterMovies />);

    const expectedOptions = [
      'All Genres',
      'Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Horror',
      'Romance',
      'Sci-Fi',
      'Thriller',
    ];
    expectedOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
