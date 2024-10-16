import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingNavBar from '~/app/_components/Bar/SettingNavBar';

// Mock the Image component from next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('SettingNavBar', () => {
  it('renders all navigation items', () => {
    render(<SettingNavBar />);
    
    const navItems = ['Profile', 'Customization', 'Notifications', 'Account', 'Organization', 'Extensions'];
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('highlights the selected navigation item', () => {
    render(<SettingNavBar />);
    
    // Initially, "Profile" should be selected
    expect(screen.getByText('Profile').closest('button')).toHaveClass('bg-white');
    expect(screen.getByText('Profile')).toHaveClass('font-medium');

    // Click on "Customization"
    fireEvent.click(screen.getByText('Customization'));

    // Now "Customization" should be selected
    expect(screen.getByText('Customization').closest('button')).toHaveClass('bg-white');
    expect(screen.getByText('Customization')).toHaveClass('font-medium');

    // "Profile" should no longer be selected
    expect(screen.getByText('Profile').closest('button')).not.toHaveClass('bg-white');
    expect(screen.getByText('Profile')).not.toHaveClass('font-medium');
  });

  it('renders icons for each navigation item', () => {
    render(<SettingNavBar />);
    
    const icons = screen.getAllByRole('img');
    expect(icons).toHaveLength(6);

    icons.forEach((icon, index) => {
      expect(icon).toHaveAttribute('src', expect.stringContaining('settings_'));
    });
  });
});