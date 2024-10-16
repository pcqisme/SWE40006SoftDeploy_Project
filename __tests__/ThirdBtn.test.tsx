import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThirdBtn from '~/app/_components/Button/ThirdBtn';

describe('ThirdBtn', () => {
  it('renders children correctly', () => {
    render(<ThirdBtn>Click me</ThirdBtn>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<ThirdBtn>Test</ThirdBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-md px-3 py-2 text-base hover:bg-white hover:text-[#3b49df]');
  });

  it('applies additional className when provided', () => {
    render(<ThirdBtn className="extra-class">Test</ThirdBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('extra-class');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ThirdBtn onClick={handleClick}>Click me</ThirdBtn>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});