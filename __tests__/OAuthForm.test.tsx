import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OAuthForm from '~/app/_components/Form/OAuthForm';
import { signIn } from 'next-auth/react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('OAuthForm', () => {
  it('renders all provider buttons', () => {
    render(<OAuthForm />);
    expect(screen.getAllByRole('button')).toHaveLength(7);
  });

  it('displays "Continue with" text when isSignUp is false', () => {
    render(<OAuthForm />);
    expect(screen.getByText('Continue with google')).toBeInTheDocument();
  });

  it('displays "Sign up with" text when isSignUp is true', () => {
    render(<OAuthForm isSignUp={true} />);
    expect(screen.getByText('Sign up with google')).toBeInTheDocument();
  });

  it('calls signIn function with correct parameters when a button is clicked', () => {
    render(<OAuthForm />);
    const googleButton = screen.getByText('Continue with google');
    fireEvent.click(googleButton);
    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
  });

  it('renders correct icons for each provider', () => {
    render(<OAuthForm />);
    const icons = screen.getAllByRole('img');
    expect(icons).toHaveLength(7);
    expect(icons[0]).toHaveAttribute('src', '/gg.svg');
    expect(icons[1]).toHaveAttribute('src', '/git.svg');
    // ... add assertions for other icons if needed
  });
});