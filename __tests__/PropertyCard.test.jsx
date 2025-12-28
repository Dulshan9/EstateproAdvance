import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { test, expect, describe } from 'vitest';
import PropertyCard from '../src/components/PropertyCard';

const mockProperty = {
  id: 'prop1',
  type: 'House',
  bedrooms: 3,
  price: 750000,
  tenure: 'Freehold',
  description: 'Three bedroom semi-detached family home.',
  location: 'Petts Wood Road, Orpington BR5',
  postcode: 'BR5',
  picture: 'images/prop1/1.jpg',
  added: '2022-10-12'
};

describe('PropertyCard', () => {
  const mockOnAdd = vi.fn();

  test('renders property details', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} onAddToFavourites={mockOnAdd} isFavourite={false} />
      </BrowserRouter>
    );

    expect(screen.getByText('Petts Wood Road, Orpington BR5')).toBeInTheDocument();
    expect(screen.getByText('£750,000')).toBeInTheDocument();
    expect(screen.getByText('Freehold')).toBeInTheDocument();
    expect(screen.getByText(/Three bedroom/)).toBeInTheDocument();
  });

  test('shows NEW badge for recent properties', () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 10); // within last 30 days
    const recentProperty = { ...mockProperty, added: recentDate.toISOString().split('T')[0] };

    render(
      <BrowserRouter>
        <PropertyCard property={recentProperty} onAddToFavourites={mockOnAdd} isFavourite={false} />
      </BrowserRouter>
    );
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  test('calls onAddToFavourites on button click', () => {
    render(
      <BrowserRouter>
        <PropertyCard property={mockProperty} onAddToFavourites={mockOnAdd} isFavourite={false} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('☆ Save'));
    expect(mockOnAdd).toHaveBeenCalledWith(mockProperty);
  });
});