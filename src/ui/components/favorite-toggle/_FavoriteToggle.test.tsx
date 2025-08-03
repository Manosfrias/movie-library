import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FavoriteToggle from './FavoriteToggle';
import styles from './FavoriteToggle.module.css';

// Mock del contexto de películas usando vi.hoisted para evitar problemas de hoisting
const mockUseMovies = vi.hoisted(() => vi.fn());
vi.mock('@/ui/context/MoviesContext', () => ({
  useMovies: mockUseMovies,
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getFavoriteToggleText: (key: string) => {
      if (key === 'showAll') return 'Mostrar Todas';
      if (key === 'showOnlyFavorites') return 'Solo Favoritas';
      return key;
    },
  })),
}));

describe('FavoriteToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto del mock
    mockUseMovies.mockReturnValue({
      showOnlyFavorites: false,
      setShowOnlyFavorites: vi.fn(),
      movies: [],
      filteredMovies: [],
      loading: false,
      searchQuery: '',
      searchCriteria: 'byTitle',
      selectedGenre: 'Todos los Géneros',
      sortBy: '',
      setSearchQuery: vi.fn(),
      setSearchCriteria: vi.fn(),
      setSelectedGenre: vi.fn(),
      setSortBy: vi.fn(),
      toggleFavorite: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly when showOnlyFavorites is false', () => {
    render(<FavoriteToggle />);

    expect(screen.getByText('Solo Favoritas')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('should render correctly when showOnlyFavorites is true', () => {
    mockUseMovies.mockReturnValue({
      showOnlyFavorites: true,
      setShowOnlyFavorites: vi.fn(),
    } as any);

    render(<FavoriteToggle />);

    expect(screen.getByText('Mostrar Todas')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('should handle toggle and update context', () => {
    const mockSetShowOnlyFavorites = vi.fn();
    mockUseMovies.mockReturnValue({
      showOnlyFavorites: false,
      setShowOnlyFavorites: mockSetShowOnlyFavorites,
    } as any);

    render(<FavoriteToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetShowOnlyFavorites).toHaveBeenCalledWith(true);
  });

  it('should have correct CSS classes when active', () => {
    mockUseMovies.mockReturnValue({
      showOnlyFavorites: true,
      setShowOnlyFavorites: vi.fn(),
    } as any);

    render(<FavoriteToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.button, styles.active);
  });

  it('should have correct CSS classes when inactive', () => {
    mockUseMovies.mockReturnValue({
      showOnlyFavorites: false,
      setShowOnlyFavorites: vi.fn(),
    } as any);

    render(<FavoriteToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.button);
    expect(button).not.toHaveClass(styles.active);
  });
});
