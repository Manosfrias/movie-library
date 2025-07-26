import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrderMovies from './OrderMovies';
import { useMovies } from '../../../core/context/MoviesContext';

// Mock del contexto de películas
vi.mock('../../../core/context/MoviesContext', () => ({
  useMovies: vi.fn(() => ({
    sortBy: '',
    setSortBy: vi.fn(),
  })),
}));

// Mock del hook useTexts
vi.mock('@/ui/hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getOrderText: () => 'Ordenar Películas',
    getOrderOptions: (key: string) => {
      const options = {
        byTitle: 'Por Título',
        byDirector: 'Por Director',
        byReleaseDate: 'Por Fecha de Estreno',
        byRating: 'Por Calificación',
      };
      return options[key as keyof typeof options];
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('OrderMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    vi.mocked(useMovies).mockReturnValue({
      sortBy: '',
      setSortBy: mockSetSortBy,
    } as any);

    render(<OrderMovies />);

    fireEvent.click(screen.getByText('Por Título'));
    expect(mockSetSortBy).toHaveBeenCalledWith('Por Título');
    expect(consoleSpy).toHaveBeenCalledWith('Ordenar por:', 'Por Título');
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
