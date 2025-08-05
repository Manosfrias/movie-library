import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MovieDetailSidebar from './MovieDetailSidebar';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('MovieDetailSidebar', () => {
  it('should render previous movie link when provided', () => {
    render(<MovieDetailSidebar previousMovieId="1" />);

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    const previousLink = screen.getByRole('link', { name: 'Anterior' });
    expect(previousLink).toHaveAttribute('href', '/1');
  });

  it('should render next movie link when provided', () => {
    render(<MovieDetailSidebar nextMovieId="2" />);

    expect(screen.getByText('Siguiente')).toBeInTheDocument();
    const nextLink = screen.getByRole('link', { name: 'Siguiente' });
    expect(nextLink).toHaveAttribute('href', '/2');
  });

  it('should render both previous and next links when both are provided', () => {
    render(<MovieDetailSidebar previousMovieId="1" nextMovieId="3" />);

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();

    const previousLink = screen.getByRole('link', { name: 'Anterior' });
    const nextLink = screen.getByRole('link', { name: 'Siguiente' });

    expect(previousLink).toHaveAttribute('href', '/1');
    expect(nextLink).toHaveAttribute('href', '/3');
  });

  it('should not render navigation section when no previous or next movies', () => {
    render(<MovieDetailSidebar />);

    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();

    // Should render empty fragment - no content
    const container = screen.queryByRole('navigation');
    expect(container).not.toBeInTheDocument();
  });

  it('should render navigation section only when at least one movie ID is provided', () => {
    const { rerender } = render(<MovieDetailSidebar previousMovieId="1" />);

    // Should have navigation section
    expect(screen.getByText('Anterior')).toBeInTheDocument();

    // Re-render with no IDs
    rerender(<MovieDetailSidebar />);

    expect(screen.queryByText('Anterior')).not.toBeInTheDocument();
    expect(screen.queryByText('Siguiente')).not.toBeInTheDocument();
  });
});
