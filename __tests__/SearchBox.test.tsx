import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '~/app/_components/Header/SearchBox';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBox', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Reset the mock router before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders the search input and button', () => {
    render(<SearchBox />);
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates the query state when typing in the input', () => {
    render(<SearchBox />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(input).toHaveValue('test query');
  });

  it('calls router.push with the correct search URL when submitting a non-empty query', () => {
    render(<SearchBox />);
    
    const input = screen.getByPlaceholderText('Search...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(form);

    expect(mockPush).toHaveBeenCalledWith('/search/test query');
    expect(input).toHaveValue('');
  });

  it('does not call router.push when submitting an empty query', () => {
    render(<SearchBox />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('renders the "Powered by Algolia" link', () => {
    render(<SearchBox />);
    
    const algoliaLink = screen.getByText('Powered by Algolia');
    expect(algoliaLink).toBeInTheDocument();
    expect(algoliaLink).toHaveAttribute('href', 'https://www.algolia.com/developers/?utm_source=devto&utm_medium=referral');
  });
});