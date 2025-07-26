import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchMovies from './SearchMovies';
import { useMovies } from '../../../core/context/MoviesContext';

// Mock del contexto de películas
vi.mock('../../../core/context/MoviesContext', () => ({
  useMovies: vi.fn(() => ({
    searchQuery: '',
    setSearchQuery: vi.fn(),
    searchCriteria: 'byTitle',
    setSearchCriteria: vi.fn(),
  })),
}));

// Mock del hook useTexts
vi.mock('../../hooks/useTexts', () => ({
  useTexts: vi.fn(() => ({
    getSearchText: (key: string) => {
      const texts = {
        placeholder: 'Buscar películas...',
      };
      return texts[key as keyof typeof texts];
    },
  })),
}));

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('SearchMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly', () => {
    render(<SearchMovies />);

    expect(
      screen.getByPlaceholderText('Buscar películas...')
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('By Title')).toBeInTheDocument();
  });

  it('should have search input functionality and update context', () => {
    const mockSetSearchQuery = vi.fn();
    vi.mocked(useMovies).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      searchCriteria: 'byTitle',
      setSearchCriteria: vi.fn(),
    } as any);

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

  it('should handle search criteria selection and update context', () => {
    const mockSetSearchCriteria = vi.fn();
    vi.mocked(useMovies).mockReturnValue({
      searchQuery: '',
      setSearchQuery: vi.fn(),
      searchCriteria: 'byTitle',
      setSearchCriteria: mockSetSearchCriteria,
    } as any);

    render(<SearchMovies />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'byDirector' } });
    expect(mockSetSearchCriteria).toHaveBeenCalledWith('byDirector');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Criterio de búsqueda:',
      'byDirector'
    );
  });

  it('should render all search criteria options', () => {
    render(<SearchMovies />);

    const expectedCriteria = [
      'By Title',
      'By Director',
      'By Release Date',
      'By Rating',
    ];
    expectedCriteria.forEach((criteria) => {
      expect(screen.getByText(criteria)).toBeInTheDocument();
    });
  });
});
