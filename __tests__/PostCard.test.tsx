import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
// import PostCard from '';
import { useRouter } from 'next/navigation';
import PostCard from '~/app/_components/Card/PostCard';


// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('PostCard', () => {
  const mockPost = {
    id: '1',
    userId: 'user1',
    username: 'John Doe',
    userProfileImage: '/profile.jpg',
    timePosted: '2023-05-20T12:00:00Z',
    coverImage: '/cover.jpg',
    title: 'Test Post',
    numberOfReactions: 10,
    tags: ['react', 'testing'],
    comments: 5,
  };

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders PostCard with correct information', () => {
    render(<PostCard {...mockPost} />);

    expect(screen.getByText(mockPost.username)).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#testing')).toBeInTheDocument();
    expect(screen.getByText('10 Reactions')).toBeInTheDocument();
    expect(screen.getByText('5 Comments')).toBeInTheDocument();
  });

  it('navigates to user profile when username is clicked', () => {
    render(<PostCard {...mockPost} />);

    fireEvent.click(screen.getByText(mockPost.username));
    expect(mockRouter.push).toHaveBeenCalledWith(`/profile/${mockPost.userId}`);
  });

  it('navigates to post page when title is clicked', () => {
    render(<PostCard {...mockPost} />);

    fireEvent.click(screen.getByText(mockPost.title));
    expect(mockRouter.push).toHaveBeenCalledWith(`/post/${mockPost.id}`);
  });

  it('displays correct date format', () => {
    render(<PostCard {...mockPost} />);

    const date = new Date(mockPost.timePosted).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('renders cover image when provided', () => {
    render(<PostCard {...mockPost} />);

    const coverImage = screen.getByAltText(mockPost.username);
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', mockPost.coverImage);
  });

  it('does not render cover image when not provided', () => {
    const postWithoutCover = { ...mockPost, coverImage: '' };
    render(<PostCard {...postWithoutCover} />);

    const coverImage = screen.queryByAltText(mockPost.username);
    expect(coverImage).not.toBeInTheDocument();
  });

  it('pluralizes "Reaction" and "Comment" correctly', () => {
    const postWithSingulars = { ...mockPost, numberOfReactions: 1, comments: 1 };
    render(<PostCard {...postWithSingulars} />);

    expect(screen.getByText('1 Reaction')).toBeInTheDocument();
    expect(screen.getByText('1 Comment')).toBeInTheDocument();
  });
});