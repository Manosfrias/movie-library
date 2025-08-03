/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock Next.js metadata
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

// Mock CSS
vi.mock('./globals.css', () => ({}));

// Mock Next.js cookies
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: () => undefined,
    set: () => {},
    delete: () => {},
  }),
}));

// Mock Server Actions
vi.mock('../ui/actions/filterActions', () => ({
  updateShowOnlyFavorites: async () => {},
  updateSelectedGenre: async () => {},
  updateSortBy: async () => {},
  clearAllFilters: async () => {},
}));

describe('RootLayout Component', () => {
  it('should render children correctly', async () => {
    const { default: RootLayout } = await import('./layout');

    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have correct html structure', async () => {
    const { default: RootLayout } = await import('./layout');

    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const htmlElement = container.querySelector('html');
    expect(htmlElement).toBeInTheDocument();

    const bodyElement = container.querySelector('body');
    expect(bodyElement).toBeInTheDocument();
  });
});
