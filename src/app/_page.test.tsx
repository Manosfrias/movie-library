import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock CSS modules
vi.mock('./page.module.css', () => ({
  default: {
    container: 'container',
    title: 'title',
    description: 'description'
  }
}))

import HomePage from './page'

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', {
      name: /welcome to movie library/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<HomePage />);

    const description = screen.getByText(
      /your personal movie collection manager/i
    );

    expect(description).toBeInTheDocument();
  });
});