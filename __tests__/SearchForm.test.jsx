import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../src/components/SearchForm';
import { test, expect, describe } from 'vitest';

describe('SearchForm', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    render(<SearchForm onSearch={mockOnSearch} />);
  });

  test('renders all form fields', () => {
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedrooms \(min\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedrooms \(max\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Added After/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postcode Area/i)).toBeInTheDocument();
  });

  test('calls onSearch with cleaned filters on submit', () => {
    fireEvent.change(screen.getByLabelText(/Property Type/i), { target: { value: 'House' } });
    fireEvent.change(screen.getByLabelText(/Min Price/i), { target: { value: '300000' } });
    fireEvent.change(screen.getByLabelText(/Bedrooms \(min\)/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Postcode Area/i), { target: { value: 'BR5' } });

    fireEvent.click(screen.getByText(/Search Properties/i));

    expect(mockOnSearch).toHaveBeenCalledWith({
      type: 'House',
      minPrice: 300000,
      maxPrice: '',
      minBedrooms: 2,
      maxBedrooms: '',
      dateFrom: '',
      postcode: 'BR5',
    });
  });

  test('clears filters on clear button click', () => {
    fireEvent.change(screen.getByLabelText(/Property Type/i), { target: { value: 'House' } });
    fireEvent.click(screen.getByText(/Clear Filters/i));
    expect(screen.getByLabelText(/Property Type/i).value).toBe('Any');
  });
});