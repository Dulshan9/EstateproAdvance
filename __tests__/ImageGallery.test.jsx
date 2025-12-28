import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from '../src/components/ImageGallery';
import { test, expect, describe } from 'vitest';

const mockImages = [
  'images/prop1/1.jpg',
  'images/prop1/2.jpg',
  'images/prop1/3.jpg'
];

describe('ImageGallery', () => {
  beforeEach(() => {
    render(<ImageGallery images={mockImages} />);
  });

  test('renders main image and thumbnails', () => {
    expect(screen.getByAltText('Property view 1')).toHaveAttribute('src', '/images/prop1/1.jpg');
    expect(screen.getAllByAltText(/Thumbnail/)).toHaveLength(3);
  });

  test('navigates to next image', () => {
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(screen.getByAltText('Property view 2')).toHaveAttribute('src', '/images/prop1/2.jpg');
  });

  test('navigates to previous image', () => {
    fireEvent.click(screen.getByLabelText('Previous image'));
    expect(screen.getByAltText('Property view 3')).toHaveAttribute('src', '/images/prop1/3.jpg');
  });

  test('selects image from thumbnail', () => {
    const thumbnails = screen.getAllByAltText(/Thumbnail/);
    fireEvent.click(thumbnails[2]);
    expect(screen.getByAltText('Property view 3')).toHaveAttribute('src', '/images/prop1/3.jpg');
  });

  test('toggles fullscreen mode', () => {
    fireEvent.click(screen.getByLabelText('Enter fullscreen'));
    expect(screen.getByAltText('Fullscreen view')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Exit fullscreen'));
    expect(screen.queryByAltText('Fullscreen view')).not.toBeInTheDocument();
  });
});