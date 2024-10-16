import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ProfileDropCard from '~/app/_components/Card/ProfileDropCard';
import { pageRoutes } from '~/app/_constants/pageRoutes';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the next-auth/react module
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('ProfileDropCard', () => {
  const mockProps = {
    userId: 'user123',
    username: 'testuser',
    email: 'test@example.com',
  };

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with user information', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.username)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
  });

  it('navigates to user profile when clicking on user info', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    fireEvent.click(screen.getByText(mockProps.username));
    expect(mockPush).toHaveBeenCalledWith(`${pageRoutes.SELF}/${mockProps.userId}`);
  });

  it('navigates to dashboard when clicking on Dashboard', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockPush).toHaveBeenCalledWith(pageRoutes.HOME);
  });

  it('navigates to create post page when clicking on Create Post', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    fireEvent.click(screen.getByText('Create Post'));
    expect(mockPush).toHaveBeenCalledWith(pageRoutes.NEW_POST);
  });

  it('navigates to reading list when clicking on Reading List', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    fireEvent.click(screen.getByText('Reading List'));
    expect(mockPush).toHaveBeenCalledWith(pageRoutes.READING_LIST);
  });

  it('renders Settings button (functionality not implemented yet)', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
    // Note: We're not testing click behavior as it's not implemented in the component
  });

  it('calls signOut when clicking on Sign Out', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    fireEvent.click(screen.getByText('Sign Out'));
    expect(signOut).toHaveBeenCalled();
  });

  it('applies correct CSS classes to the main container', () => {
    render(<ProfileDropCard {...mockProps} />);
    
    const container = screen.getByText(mockProps.username).closest('div');
    expect(container).toHaveClass('absolute top-9 right-0 mt-2 w-[234px] rounded-md border bg-white p-2 shadow-md');
  });


});