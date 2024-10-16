import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '~/app/_components/Bar/NavBar';
import { pageRoutes } from '~/app/_constants/pageRoutes';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('NavBar', () => {
  it('renders all navigation items', () => {
    render(<NavBar currentTab="Relevant" />);
    
    expect(screen.getByText('Relevant')).toBeInTheDocument();
    expect(screen.getByText('Latest')).toBeInTheDocument();
    expect(screen.getByText('Top')).toBeInTheDocument();
  });

  it('applies bold style to the selected tab', () => {
    render(<NavBar currentTab="Latest" />);
    
    const latestLink = screen.getByText('Latest');
    expect(latestLink).toHaveClass('font-bold');
    expect(screen.getByText('Relevant')).not.toHaveClass('font-bold');
    expect(screen.getByText('Top')).not.toHaveClass('font-bold');
  });

  it('changes selected tab when clicked', () => {
    render(<NavBar currentTab="Relevant" />);
    
    const topLink = screen.getByText('Top');
    fireEvent.click(topLink);
    
    expect(topLink).toHaveClass('font-bold');
    expect(screen.getByText('Relevant')).not.toHaveClass('font-bold');
  });

  it('renders correct links for each tab', () => {
    render(<NavBar currentTab="Relevant" />);
    
    expect(screen.getByText('Relevant').closest('a')).toHaveAttribute('href', pageRoutes.HOME);
    expect(screen.getByText('Latest').closest('a')).toHaveAttribute('href', pageRoutes.LATEST);
    expect(screen.getByText('Top').closest('a')).toHaveAttribute('href', pageRoutes.TOP);
  });

  it('applies custom className when provided', () => {
    render(<NavBar currentTab="Relevant" className="custom-class" />);
    
    const navContainer = screen.getByText('Relevant').closest('div');
    expect(navContainer).toHaveClass('custom-class');
  });
});