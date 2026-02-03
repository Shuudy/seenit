import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/components/VideoCard', () => ({
  VideoCard: ({ video }: { video: { title: string } }) => <div>{video.title}</div>,
}));

import { useSearchParams } from 'next/navigation';

import { VideosGrid } from '@/app/_components/VideosGrid';
import { VideosGridSearchEmpty } from '@/app/_components/VideosGridSearchEmpty';
import { renderWithProviders } from '@/tests/Utilities';
import { setMockVideos } from '@/tests/msw/handlers';
import type { Video } from '@/types/video';

const baseVideo = {
  description: 'desc',
  url: 'https://example.com/video.mp4',
  duration: 120,
  count_views: 42,
  likes_count: 0,
  user: { id: 1, username: 'alice' },
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
} satisfies Omit<Video, 'id' | 'title'>;

function createVideo(id: number, title: string): Video {
  return { id, title, ...baseVideo };
}

function mockSearchParameters(query?: string) {
  const searchParameters = new URLSearchParams();
  if (query !== undefined) searchParameters.set('q', query);

  vi.mocked(useSearchParams).mockReturnValue(
    searchParameters as unknown as ReturnType<typeof useSearchParams>
  );
}

describe('VideosGrid', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders all videos when there is no query', async () => {
    mockSearchParameters();
    setMockVideos([createVideo(1, 'Next.js tutorial'), createVideo(2, 'Laravel testing')]);

    renderWithProviders(<VideosGrid />);

    expect(await screen.findByText('Next.js tutorial')).toBeInTheDocument();
    expect(await screen.findByText('Laravel testing')).toBeInTheDocument();
  });

  it('renders the empty state when there are no results', async () => {
    mockSearchParameters('react');
    setMockVideos([createVideo(1, 'Next.js tutorial'), createVideo(2, 'Laravel testing')]);

    renderWithProviders(<VideosGrid />);

    expect(await screen.findByText('No results for "react"')).toBeInTheDocument();
  });

  it('filters videos when a query is provided', async () => {
    mockSearchParameters('laravel');
    setMockVideos([createVideo(1, 'Next.js tutorial'), createVideo(2, 'Laravel testing')]);

    renderWithProviders(<VideosGrid />);

    expect(await screen.findByText('Laravel testing')).toBeInTheDocument();
    expect(screen.queryByText('Next.js tutorial')).not.toBeInTheDocument();
  });
});

describe('VideosGridSearchEmpty', () => {
  it('truncates a query that is too long', () => {
    const longQuery = 'a'.repeat(150);
    const truncated = `${'a'.repeat(100)}…`;

    renderWithProviders(<VideosGridSearchEmpty query={longQuery} />);

    expect(
      screen.getByRole('heading', { name: `No results for "${truncated}"` })
    ).toBeInTheDocument();
  });
});
