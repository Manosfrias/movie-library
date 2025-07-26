import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterMovies from './FilterMovies';
import asideCardStyles from '../aside-card/AsideCard.module.css';
import { useMovies } from '../../../core/context/MoviesContext';

// Mock del contexto de películas
vi.mock('../../../core/context/MoviesContext', () => ({
  useMovies: vi.fn(() => ({
    selectedGenre: 'All Genres',
    setSelectedGenre: vi.fn(),
  })),
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getFilterText: (key: string) => {
      const texts = {
        title: 'Filtrar Películas',
      };
      return texts[key as keyof typeof texts];
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('FilterMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    vi.mocked(useMovies).mockReturnValue({
      selectedGenre: 'All Genres',
      setSelectedGenre: mockSetSelectedGenre,
    } as any);

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
