import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryBtn from '~/app/_components/Button/PrimaryBtn';

describe('PrimaryBtn', () => {
  it('renders children correctly', () => {
    render(<PrimaryBtn>Click me</PrimaryBtn>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PrimaryBtn className="custom-class">Button</PrimaryBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryBtn onClick={handleClick}>Click me</PrimaryBtn>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct default styles', () => {
    render(<PrimaryBtn>Button</PrimaryBtn>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[40px]');
    expect(button).toHaveClass('text-base');
    expect(button).toHaveClass('hover:bg-[#3b49df]');
    expect(button).toHaveClass('px-2');
    expect(button).toHaveClass('hover:text-white');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-[#3b49df]');
    expect(button).toHaveClass('text-[#3b49df]');
    expect(button).toHaveClass('rounded-md');
  });

  it('has hover:underline class on span', () => {
    render(<PrimaryBtn>Button</PrimaryBtn>);
    const span = screen.getByText('Button');
    expect(span).toHaveClass('hover:underline');
  });
});