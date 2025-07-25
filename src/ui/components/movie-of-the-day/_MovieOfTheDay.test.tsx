import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieOfTheDay from './MovieOfTheDay';

describe('MovieOfTheDay', () => {
  it('should render correctly', () => {
    render(<MovieOfTheDay />);

    expect(screen.getByText('Película del Día')).toBeInTheDocument();
  });

  it('should have a container element', () => {
    render(<MovieOfTheDay />);

    const container = screen.getByText('Película del Día').closest('div');
    expect(container).toBeInTheDocument();
  });
});
