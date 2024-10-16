import React from 'react';
import { render, screen } from '@testing-library/react';
import TextToolBar from '~/app/_components/Bar/TextToolBar';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('TextToolBar', () => {
  it('renders all tools', () => {
    render(<TextToolBar />);

    const expectedTools = [
      "Bold", "Italic", "Link", "Ordered List", "Unordered List",
      "Heading", "Quote", "Code", "Code Block", "Embed", "Upload Image"
    ];

    expectedTools.forEach(toolName => {
      const toolButton = screen.getByRole('button', { name: new RegExp(toolName, 'i') });
      expect(toolButton).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<TextToolBar className={customClass} />);
    
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('renders correct number of buttons', () => {
    render(<TextToolBar />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(11); // Number of tools in the array
  });

  it('renders images with correct attributes', () => {
    render(<TextToolBar />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(11);

    images.forEach((img) => {
      expect(img).toHaveAttribute('width', '24');
      expect(img).toHaveAttribute('height', '24');
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });
  });
});