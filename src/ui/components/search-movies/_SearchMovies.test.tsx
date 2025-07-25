import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchMovies from './SearchMovies';

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('SearchMovies', () => {
  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should render correctly', () => {
    render(<SearchMovies />);

    expect(screen.getByPlaceholderText('Buscar películas...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('By Title')).toBeInTheDocument();
  });

  it('should have search input functionality', () => {
    render(<SearchMovies />);

    const searchInput = screen.getByPlaceholderText('Buscar películas...');
    fireEvent.change(searchInput, { target: { value: 'Inception' } });

    expect(searchInput).toHaveValue('Inception');
    expect(consoleSpy).toHaveBeenCalledWith('Buscando:', 'Inception');
  });

  it('should have "By Title" selected by default', () => {
    render(<SearchMovies />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('byTitle');
  });

  it('should handle search criteria selection', () => {
    render(<SearchMovies />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'byDirector' } });
    expect(consoleSpy).toHaveBeenCalledWith('Criterio de búsqueda:', 'byDirector');
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
