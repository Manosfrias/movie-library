import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock CSS modules
vi.mock('./Button.module.css', () => ({
  default: {
    button: 'button',
    primary: 'primary',
    secondary: 'secondary',
  },
}));

import Button from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'primary');
  });

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'secondary');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('sets button type correctly', () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
