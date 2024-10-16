import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthSection from '~/app/_components/Header/AuthSection';

// Mock the next-auth/react module
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('AuthSection', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders login and create account buttons when unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });

    render(<AuthSection />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('renders user profile and other buttons when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { user: { name: 'Test User', email: 'test@example.com', id: '123' } },
    });

    render(<AuthSection />);

    expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /notification icon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument(); // User profile button
  });

  it('opens profile dropdown when user profile is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { user: { name: 'Test User', email: 'test@example.com', id: '123' } },
    });

    render(<AuthSection />);

    const profileButton = screen.getByRole('button', { name: '' });
    fireEvent.click(profileButton);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('navigates to login page when login button is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });

    render(<AuthSection />);

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('navigates to signup page when create account button is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });

    render(<AuthSection />);

    const createAccountButton = screen.getByText('Create account');
    fireEvent.click(createAccountButton);

    expect(mockPush).toHaveBeenCalledWith('/signup');
  });

  it('navigates to new post page when create post button is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { user: { name: 'Test User', email: 'test@example.com', id: '123' } },
    });

    render(<AuthSection />);

    const createPostButton = screen.getByText('Create Post');
    fireEvent.click(createPostButton);

    expect(mockPush).toHaveBeenCalledWith('/new-post');
  });
});