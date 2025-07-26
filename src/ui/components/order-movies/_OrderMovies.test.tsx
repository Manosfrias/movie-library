import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrderMovies from './OrderMovies';

// Mock console.log para los tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('OrderMovies', () => {
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

  it('should handle order selection', () => {
    render(<OrderMovies />);

    fireEvent.click(screen.getByText('Por Título'));
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
