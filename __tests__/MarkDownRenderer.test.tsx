import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '~/app/_components/MdTextArea/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('renders markdown content correctly', () => {
    const markdown = `
# Heading 1
## Heading 2
This is a paragraph.
    `;

    render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);

    // Check if headings are rendered with correct classes
    const heading1 = screen.getByText('Heading 1');
    expect(heading1.tagName).toBe('H1');
    expect(heading1).toHaveClass('text-[30px]', 'font-bold');

    const heading2 = screen.getByText('Heading 2');
    expect(heading2.tagName).toBe('H2');
    expect(heading2).toHaveClass('text-[25px]', 'font-bold');

    // Check if paragraph is rendered with correct class
    const paragraph = screen.getByText('This is a paragraph.');
    expect(paragraph.tagName).toBe('P');
    expect(paragraph).toHaveClass('text-xl');
  });

  it('applies custom className to all elements', () => {
    const markdown = `
# Heading 1
## Heading 2
This is a paragraph.
    `;
    const customClass = 'custom-class';

    render(<MarkdownRenderer className={customClass}>{markdown}</MarkdownRenderer>);

    const heading1 = screen.getByText('Heading 1');
    const heading2 = screen.getByText('Heading 2');
    const paragraph = screen.getByText('This is a paragraph.');

    expect(heading1).toHaveClass(customClass);
    expect(heading2).toHaveClass(customClass);
    expect(paragraph).toHaveClass(customClass);
  });
});