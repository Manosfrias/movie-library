import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  it('should toggle list visibility when title is clicked', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);
    
    const title = screen.getByText(mockTitle);
    const list = title.nextElementSibling;
    
    // Initially, list should be collapsed (hidden)
    expect(list).toHaveClass(styles.hidden);
    
    // Click title to expand
    fireEvent.click(title);
    expect(list).not.toHaveClass(styles.hidden);
    
    // Click again to collapse
    fireEvent.click(title);
    expect(list).toHaveClass(styles.hidden);
  });  it('should handle keyboard interactions for toggle', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);
    
    const title = screen.getByText(mockTitle);
    const list = title.nextElementSibling;
    
    // Initially collapsed (hidden)
    expect(list).toHaveClass(styles.hidden);
    
    // Toggle with Enter key to expand
    fireEvent.keyDown(title, { key: 'Enter' });
    expect(list).not.toHaveClass(styles.hidden);
    
    // Toggle with Space key to collapse
    fireEvent.keyDown(title, { key: ' ' });
    expect(list).toHaveClass(styles.hidden);
  });

  it('should have proper accessibility attributes', () => {
    render(<AsideCard title={mockTitle} items={mockItems} />);

    const title = screen.getByText(mockTitle);

    expect(title).toHaveAttribute('role', 'button');
    expect(title).toHaveAttribute('tabIndex', '0');
    expect(title).toHaveAttribute('aria-expanded', 'false'); // Initially collapsed
    expect(title).toHaveAttribute('aria-controls', `${mockTitle}-list`);

    // Click to expand
    fireEvent.click(title);
    expect(title).toHaveAttribute('aria-expanded', 'true');
  });
});
