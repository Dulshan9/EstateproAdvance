import { render, screen, fireEvent } from '@testing-library/react';
import Favourites from '../src/components/Favourites';
import { test, expect, describe } from 'vitest';

const mockFavourites = [
  {
    id: 'prop1',
    type: 'House',
    price: 750000,
    location: 'Petts Wood Road, Orpington',
    picture: 'images/prop1/1.jpg'
  }
];

describe('Favourites', () => {
  const mockRemove = vi.fn();
  const mockClear = vi.fn();

  test('shows empty state when no favourites', () => {
    render(<Favourites favourites={[]} onRemoveFromFavourites={mockRemove} onClearFavourites={mockClear} />);
    expect(screen.getByText('No favourite properties yet')).toBeInTheDocument();
  });

  test('renders favourite items', () => {
    render(<Favourites favourites={mockFavourites} onRemoveFromFavourites={mockRemove} onClearFavourites={mockClear} />);
    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getAllByText('£750,000')).toHaveLength(3);
  });

  test('removes a favourite', () => {
    render(<Favourites favourites={mockFavourites} onRemoveFromFavourites={mockRemove} onClearFavourites={mockClear} />);
    fireEvent.click(screen.getByLabelText('Remove from favourites'));
    expect(mockRemove).toHaveBeenCalledWith('prop1');
  });

  test('shows confirmation modal and clears all', () => {
    render(<Favourites favourites={mockFavourites} onRemoveFromFavourites={mockRemove} onClearFavourites={mockClear} />);
    fireEvent.click(screen.getByRole('button', { name: /Clear All/i }));
    expect(screen.getByText('Clear all favourites?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes, Clear All'));
    expect(mockClear).toHaveBeenCalled();
  });
});

