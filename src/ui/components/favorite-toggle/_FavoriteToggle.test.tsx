import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FavoriteToggle from './FavoriteToggle';
import { useMovies } from '../../../core/context/MoviesContext';
import styles from './FavoriteToggle.module.css';

// Mock del contexto de películas
vi.mock('../../../core/context/MoviesContext', () => ({
  useMovies: vi.fn(() => ({
    showOnlyFavorites: false,
    setShowOnlyFavorites: vi.fn(),
  })),
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getFavoriteToggleText: (key: string) => {
      const texts = {
        showAll: 'Mostrar Todas',
        showOnlyFavorites: 'Solo Favoritas',
      };
      return texts[key as keyof typeof texts];
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('FavoriteToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly when showOnlyFavorites is false', () => {
    render(<FavoriteToggle />);

    expect(screen.getByText('Solo Favoritas')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('should render correctly when showOnlyFavorites is true', () => {
    vi.mocked(useMovies).mockReturnValue({
      showOnlyFavorites: true,
      setShowOnlyFavorites: vi.fn(),
    } as any);

    render(<FavoriteToggle />);

    expect(screen.getByText('Mostrar Todas')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('should handle toggle and update context', () => {
    const mockSetShowOnlyFavorites = vi.fn();
    vi.mocked(useMovies).mockReturnValue({
      showOnlyFavorites: false,
      setShowOnlyFavorites: mockSetShowOnlyFavorites,
    } as any);

    render(<FavoriteToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetShowOnlyFavorites).toHaveBeenCalledWith(true);
    expect(consoleSpy).toHaveBeenCalledWith('Mostrar solo favoritas:', true);
  });

  it('should have correct CSS classes when active', () => {
    vi.mocked(useMovies).mockReturnValue({
      showOnlyFavorites: true,
      setShowOnlyFavorites: vi.fn(),
    } as any);

    render(<FavoriteToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.button, styles.active);
  });

  it('should have correct CSS classes when inactive', () => {
    vi.mocked(useMovies).mockReturnValue({
      showOnlyFavorites: false,
      setShowOnlyFavorites: vi.fn(),
    } as any);

    render(<FavoriteToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.button);
    expect(button).not.toHaveClass(styles.active);
  });
});
