import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AsideCard from './AsideCard';
import styles from './AsideCard.module.css';

describe('AsideCard', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3'];
  const mockTitle = 'Test Card';

  it('should render correctly with title and items', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should call onItemClick when button is clicked', () => {
    const mockOnItemClick = vi.fn();
    render(
      <AsideCard
        title={mockTitle}
        items={mockItems}
        onItemClick={mockOnItemClick}
      />
    );

    fireEvent.click(screen.getByText('Item 1'));
    expect(mockOnItemClick).toHaveBeenCalledWith('Item 1');
  });

  it('should highlight selected item', () => {
    render(
      <AsideCard title={mockTitle} items={mockItems} selectedItem="Item 2" />
    );

    const selectedButton = screen.getByText('Item 2');
    expect(selectedButton).toHaveClass(styles.selected);
  });

  it('should render without onItemClick prop', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const button = screen.getByText('Item 1');
    fireEvent.click(button);
    // Should not throw error
    expect(button).toBeInTheDocument();
  });
});
