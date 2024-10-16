import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SecondaryBtn from '~/app/_components/Button/SecondaryBtn';

describe('SecondaryBtn', () => {
  it('renders children correctly', () => {
    render(<SecondaryBtn>Click me</SecondaryBtn>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SecondaryBtn className="custom-class">Button</SecondaryBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<SecondaryBtn onClick={handleClick}>Click me</SecondaryBtn>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct default styles', () => {
    render(<SecondaryBtn>Button</SecondaryBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:underline');
    expect(button).toHaveClass('h-[40px]');
    expect(button).toHaveClass('text-[16px]');
    expect(button).toHaveClass('text-black/50');
    expect(button).toHaveClass('hover:bg-[#3b49df]/15');
    expect(button).toHaveClass('rounded-md');
    expect(button).toHaveClass('px-2');
    expect(button).toHaveClass('hover:text-[#3b49df]');
  });
});